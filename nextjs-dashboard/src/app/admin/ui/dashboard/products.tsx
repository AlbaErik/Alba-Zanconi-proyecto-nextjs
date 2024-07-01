import { fetchFilteredProducts } from '@/app/lib/data';
import React from 'react';
import '@/app/admin/ui/style.css';
import Card from './productCard';

export default async function ProductList({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const products = await fetchFilteredProducts(query, currentPage);
    return (
        <>
            {products.map(product => (
                <Card key={product.id} title={product.name} product={product} />
            ))}
        </>
    );
}

