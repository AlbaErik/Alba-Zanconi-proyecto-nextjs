require('dotenv').config();
const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const {
    users,
    categories,
    products,
    orders,
} = require('../src/app/lib/placeholder-data.js');

async function createSchema(client) {
    try {
        await client.sql`CREATE SCHEMA IF NOT EXISTS store`;

        console.log('Schema store created or already exists');
    } catch (error) {
        console.error('Error creating schema:', error);
        throw error;
    }
}

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS store.users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role VARCHAR(50) NOT NULL
      );
    `;

        console.log(`Created "users" table`);

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
          INSERT INTO store.users (id, name, email, password, role)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
          ON CONFLICT (id) DO NOTHING;
        `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function seedCategories(client) {
    try {
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS store.categories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;

        console.log(`Created "categories" table`);

        const insertedCategories = await Promise.all(
            categories.map(
                (category) => client.sql`
          INSERT INTO store.categories (id, name)
          VALUES (${category.id}, ${category.name})
          ON CONFLICT (id) DO NOTHING;
        `,
            ),
        );

        console.log(`Seeded ${insertedCategories.length} categories`);

        return {
            createTable,
            categories: insertedCategories,
        };
    } catch (error) {
        console.error('Error seeding categories:', error);
        throw error;
    }
}

async function seedProducts(client) {
    try {
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS store.products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC(10, 2) NOT NULL,
        image_url TEXT,
        category_id UUID REFERENCES store.categories(id)
      );
    `;

        console.log(`Created "products" table`);

        const insertedProducts = await Promise.all(
            products.map(
                (product) => client.sql`
          INSERT INTO store.products (id, name, description, price, image_url, category_id)
          VALUES (${product.id}, ${product.name}, ${product.description}, ${product.price}, ${product.imageUrl}, ${product.categoryId})
          ON CONFLICT (id) DO NOTHING;
        `,
            ),
        );

        console.log(`Seeded ${insertedProducts.length} products`);

        return {
            createTable,
            products: insertedProducts,
        };
    } catch (error) {
        console.error('Error seeding products:', error);
        throw error;
    }
}

async function seedOrders(client) {
    try {
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS store.orders (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID REFERENCES store.users(id),
                total_amount NUMERIC(10, 2) NOT NULL,
                items JSON NOT NULL,
                status VARCHAR(50) NOT NULL
            );
        `;

        console.log(`Created "orders" table`);

        const insertedOrders = await Promise.all(
            orders.map(
                (order) => client.sql`
                    INSERT INTO store.orders (id, user_id, total_amount, items, status)
                    VALUES (${order.id}, ${order.userId}, ${order.totalAmount}, ${JSON.stringify(order.items)}, ${order.status})
                    ON CONFLICT (id) DO NOTHING;
                `,
            ),
        );

        console.log(`Seeded ${insertedOrders.length} orders`);

        return {
            createTable,
            orders: insertedOrders,
        };
    } catch (error) {
        console.error('Error seeding orders:', error);
        throw error;
    }
}


async function main() {
    const client = await db.connect();

    //await createSchema(client);
    await seedUsers(client);
    await seedCategories(client);
    await seedProducts(client);
    await seedOrders(client);

    await client.end();
}

main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err);
});
