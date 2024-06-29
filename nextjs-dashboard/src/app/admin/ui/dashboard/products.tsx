import { ProductWithCategory, fetchAllProducts } from '@/app/lib/data';
import React from 'react';
import '@/app/admin/ui/style.css';
import { DeleteProduct } from './buttons';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className="border rounded-lg p-4 shadow-lg max-w-sm mx-auto bg-white">
            <div className="relative mb-4" style={{ maxWidth: '100%', height: 'auto' }}>
                <Image
                    src={product.image_url}
                    alt={product.name}
                    width={500}
                    height={300}
                    className="rounded-lg"
                />
            </div>
            <div className="text-left">
                <p className="font-semibold text-lg mb-1 break-words">Description: <span className="font-normal">{product.description}</span></p>
                <p className="font-semibold text-lg mb-1">Category: <span className="font-normal">{product.category_name}</span></p>
                <p className="font-semibold text-lg mb-4">Price: <span className="font-normal">${product.price}</span></p>
            </div>
            <div className="flex justify-between">
                <DeleteProduct id={product.id} />
                <Link href={{ pathname: `/admin/dashboard/products/update/${product.id}` }}>
                    <button className="rounded-md border p-2 hover:bg-gray-100">
                        Update Product
                    </button>
                </Link>
            </div>
        </div>
    );
}