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


export async function fetchAllProducts() {
    try {
        const data = await sql`
        SELECT 
          products.id,
          products.name,
          products.description,
          products.price,
          products.image_url,
          categories.name AS category_name
        FROM store.products
        JOIN store.categories ON products.category_id = categories.id
      `;
        return data.rows;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch products.');
    }
}

export async function fetchAllOrders() {
    try {
        const data = await sql`
        SELECT 
          orders.id,
          orders.user_id,
          orders.total_amount,
          orders.items,
          orders.status
        FROM store.orders
      `;

        const orders = data.rows.map(order => ({
            ...order,
            items: JSON.parse(order.items)
        }));

        return orders;
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



export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
    try {
        console.log("PRODUCTOS DATS.ts");
        const data = await sql`
        SELECT 
          *
        FROM store.products
        WHERE category_id = ${categoryId}
      `;
        // Mapea los resultados a un array de objetos Product
        const products: Product[] = data.rows.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
            price: row.price,
            image_url: row.image_url,
            category_id: row.category_id
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
