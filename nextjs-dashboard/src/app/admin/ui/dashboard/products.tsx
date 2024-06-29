import { fetchAllProducts } from '@/app/lib/data';
import React from 'react';
import '@/app/admin/ui/style.css';
import Card from './productCard';

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

