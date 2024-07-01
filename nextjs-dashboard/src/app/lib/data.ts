import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category_id: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
};

export async function fetchAllUsers(): Promise<User[]> {
    try {
        const data = await sql`SELECT * FROM store.users`;
        return data.rows as User[];
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch users.');
    }
}

export type CategoryField = {
    id: string;
    name: string;
};


export async function fetchFullCategory(): Promise<string[]> {
    try {
        const result = await sql`
          SELECT
            name
          FROM store.categories
          ORDER BY name ASC
        `;
        const categories = result.rows.map(row => row.name);
        return categories;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all categories.');
    }
}


export async function fetchAllCategories(): Promise<string[]> {
    noStore();
    try {
        const data = await sql`SELECT name FROM store.categories`;
        const categoryNames = data.rows.map(row => row.name);
        return categoryNames;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch categories.');
    }
}

export async function fetchProductsPages(query: string) {
    noStore();
    try {
      const count = await sql`SELECT COUNT(*)
      FROM store.products
      WHERE
        products.name ILIKE ${`%${query}%`} OR
        products.description ILIKE ${`%${query}%`}
    `;
  
      const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of products.');
    }
  }

export type ProductWithCategory = {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category_name: string;
};

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredProducts(
    query: string,
    currentPage: number,
): Promise<ProductWithCategory[]> {
    noStore()
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        const data = await sql`
        SELECT 
          products.id,
          products.name,
          products.description,
          products.price,
          products.image_url,
          products.category_id
        FROM store.products
        WHERE
          products.name ILIKE ${`%${query}%`} OR
          products.description ILIKE ${`%${query}%`}
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;

        // Mapear los productos para reemplazar category_id por category_name
        const productsWithCategoryName: ProductWithCategory[] = await Promise.all(
            data.rows.map(async (product) => {
                const categoryName = await fetchCategoryById(product.category_id);
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image_url: product.image_url,
                    category_name: categoryName,
                };
            })
        );

        return productsWithCategoryName;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch products.');
    }
}

export async function fetchAllProducts(): Promise<ProductWithCategory[]> {
    noStore()
    try {
        const data = await sql`
        SELECT 
          products.id,
          products.name,
          products.description,
          products.price,
          products.image_url,
          products.category_id
        FROM store.products
      `;

        // Mapear los productos para reemplazar category_id por category_name
        const productsWithCategoryName: ProductWithCategory[] = await Promise.all(
            data.rows.map(async (product) => {
                const categoryName = await fetchCategoryById(product.category_id);
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image_url: product.image_url,
                    category_name: categoryName,
                };
            })
        );

        return productsWithCategoryName;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch products.');
    }
}

export async function fetchProductById(productId: string): Promise<ProductWithCategory> {
    noStore()
    try {
        const data = await sql`
        SELECT 
          products.id,
          products.name,
          products.description,
          products.price,
          products.image_url,
          products.category_id
        FROM store.products
        WHERE products.id = ${productId}
      `;

        if (data.rows.length > 0) {
            const categoryName = await fetchCategoryById(data.rows[0].category_id);
            const productWithCategoryName: ProductWithCategory = {
                id: data.rows[0].id,
                name: data.rows[0].name,
                description: data.rows[0].description,
                price: data.rows[0].price,
                image_url: data.rows[0].image_url,
                category_name: categoryName
            }
            return productWithCategoryName;
        } else {
            throw new Error(`Product with ID ${productId} not found.`);
        }
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch product by ID.');
    }
}

export async function fetchCategoryByName(categoryName: string): Promise<string> {
    noStore();
    try {
        const data = await sql`
        SELECT 
          categories.id
        FROM store.categories
        WHERE categories.name = ${categoryName}
      `;
        if (data.rows.length > 0) {
            return data.rows[0].id;
        } else {
            throw new Error(`Category with ID ${categoryName} not found.`);
        }
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch category by ID.');
    }
}

export async function fetchCategoryById(categoryId: string): Promise<string> {
    noStore();
    try {
        const data = await sql`
        SELECT 
          categories.name
        FROM store.categories
        WHERE categories.id = ${categoryId}
      `;
        if (data.rows.length > 0) {
            return data.rows[0].name;
        } else {
            throw new Error(`Category with ID ${categoryId} not found.`);
        }
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch category by ID.');
    }
}
export type OrderItem = {
    productId: string;
    quantity: number;
    productName: string;
    price: number;
};

export type Order = {
    id: string;
    user_name: string;
    total_amount: number;
    items: OrderItem[];
    status: string;
};

export async function fetchProductNameById(productId: string): Promise<string> {
    try {
        const data = await sql`
            SELECT name FROM store.products WHERE id = ${productId}
        `;
        if (data.rows.length > 0) {
            return data.rows[0].name;
        } else {
            throw new Error(`Product with ID ${productId} not found.`);
        }
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch product name.');
    }
}

export async function fetchProductPriceById(productId: string): Promise<number> {
    try {
        const data = await sql`
            SELECT price FROM store.products WHERE id = ${productId}
        `;
        if (data.rows.length > 0) {
            return data.rows[0].price;
        } else {
            throw new Error(`Product with ID ${productId} not found.`);
        }
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch product name.');
    }
}

export async function processOrderItems(items: { productId: string; quantity: number }[]): Promise<OrderItem[]> {
    const processedItems = await Promise.all(items.map(async item => {
        const productName = await fetchProductNameById(item.productId);
        return {
            productId: item.productId,
            quantity: item.quantity,
            productName,
            price: await fetchProductPriceById(item.productId),
        };
    }));
    return processedItems;
}

export async function fetchAllOrders(): Promise<Order[]> {
    noStore();
    try {
        const data = await sql`
            SELECT 
                orders.id,
                users.name as user_name,
                orders.total_amount,
                orders.items,
                orders.status
            FROM store.orders
            JOIN store.users ON store.orders.user_id = store.users.id
        `;

        return await Promise.all(data.rows.map(async (order) => ({
            id: order.id,
            user_name: order.user_name,
            total_amount: order.total_amount,
            items: await processOrderItems(JSON.parse(order.items)),
            status: order.status
        })));
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch orders.');
    }
}

export async function getUserRole(email: string): Promise<string> {
    noStore();
    try {
        const user = await sql`SELECT * FROM store.users WHERE email=${email}`;
        return user.rows[0].role;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getUser(email: string) {
    noStore();
    try {
        const user = await sql`SELECT * FROM store.users WHERE email=${email}`;
        return user.rows[0] as User;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function fetchProductsByCategory(categoryId: string): Promise<ProductWithCategory[]> {
    noStore();
    try {
        console.log("PRODUCTOS DATS.ts");
        const data = await sql`
        SELECT 
          *
        FROM store.products
        WHERE category_id = ${categoryId}
      `;
        // Mapea los resultados a un array de objetos Product
        const categoria = await fetchCategoryById(data.rows[0].category_id)
        const products: ProductWithCategory[] = data.rows.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
            price: row.price,
            image_url: row.image_url,
            category_name: categoria,
        }));

        return products;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch products by category.');
    }
}

export async function fetchIdCategoryByName(categoryName: string): Promise<string[]> {
    noStore();
    try {
        const data = await sql`
        SELECT 
          categories.id
        FROM store.categories
        WHERE categories.name = ${categoryName}
      `;

        const categoryId = data.rows.map(category => category.id);

        return categoryId;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch products by category.');
    }
}

export async function fetchOrdersByUser(userId: string) {
    noStore();
    try {
        const data = await sql`
        SELECT 
          orders.id,
          orders.total_amount,
          orders.items,
          orders.status
        FROM store.orders
        WHERE orders.user_id = ${userId}
      `;

        const orders = data.rows.map(order => ({
            id: order.id,
            total_amount: order.total_amount,
            items: JSON.stringify(order.items), // Convertir items a JSON string
            status: order.status
        }));

        return orders;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch orders by user.');
    }
}

export async function fetchOrdersListByUser(userId: string): Promise<string[]> {
    noStore();
    try {
        const data = await sql`
        SELECT 
          orders.items
        FROM store.orders
        WHERE orders.user_id = ${userId}
      `;

        const orders = data.rows.map(order => JSON.stringify(order.items)); // Convertir items a JSON string y retornarlo como un array de strings

        return orders;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch orders by user.');
    }
}