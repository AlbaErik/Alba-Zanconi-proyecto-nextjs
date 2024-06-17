import { sql } from '@vercel/postgres';

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

export async function fetchAllCategories(): Promise<string[]> {
    try {
        const data = await sql`SELECT name FROM store.categories`;
        const categoryNames = data.rows.map(row => row.name);
        return categoryNames;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch categories.');
    }
}

export type ProductWithCategory = {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category_name: string; // Cambiar el nombre aquí
};

export async function fetchAllProducts(): Promise<ProductWithCategory[]> {
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

export async function fetchCategoryById(categoryId: string): Promise<string> {
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



export type Order = {
    id: string;
    user_id: string;
    total_amount: number;
    items: any;
    status: string;
};

export async function fetchAllOrders(): Promise<Order[]> {
    try {
        const data = await sql`
            SELECT 
                id,
                user_id,
                total_amount,
                items,
                status
            FROM store.orders
        `;

        return data.rows.map(order => ({
            id: order.id,
            user_id: order.user_id,
            total_amount: order.total_amount,
            items: JSON.parse(order.items), // Parse items JSON string
            status: order.status
        }));
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch orders.');
    }
}

export async function getUser(email: string) {
    try {
        const user = await sql`SELECT * FROM store.users WHERE email=${email}`;
        return user.rows[0] as User;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}



export async function fetchProductsByCategory(categoryId: string): Promise<ProductWithCategory[]> {
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

