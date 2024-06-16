import { ProductWithCategory, fetchAllProducts } from '@/app/lib/data';
import React from 'react';
import '@/app/admin/ui/style.css';

export default async function ProductList() {
    const products = await fetchAllProducts();
    return (
        <>
            {products.map(product => (
                <Card key={product.id} title={product.name} product={product} />
            ))}
        </>
    );
}

function Card({ title, product }: { title: string; product: ProductWithCategory }) {
    return (
        <div className="rounded-xl bg-blue-50 p-2 shadow-sm">
            <div className="flex p-4">
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <div className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
                <ProductCard product={product} />
            </div>
        </div>
    );
}

function ProductCard({ product }: { product: ProductWithCategory }) {
    return (
        <div>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category ID: {product.category_name}</p>
            <img src={product.image_url} alt={product.name} className="product-image" />
        </div>
    );
}