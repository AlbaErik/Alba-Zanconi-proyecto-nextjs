'use client';
import { ProductWithCategory, fetchAllProducts } from '@/app/lib/data';
import React, { useState } from 'react';
import '@/app/admin/ui/style.css';
import Link from 'next/link';
import Image from 'next/image';
import Popup from 'reactjs-popup';
import { deleteProduct } from '../../dashboard/actions';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Card({ title, product }: { title: string; product: ProductWithCategory }) {
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
    const [popUpVisible, setModalOpen] = useState<boolean>(false);

    const handleDeleteClick = () => {
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteProduct(product.id);
            toast('Product deleted successfully');
            setModalOpen(false);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-lg max-w-xxl mx-auto bg-white flex">
            <div className="flex-shrink-0 mr-4">
                <Image
                    src={product.image_url}
                    alt={product.name}
                    width={250}
                    height={150}
                    className="rounded-lg"
                />
                <div className="mt-2">
                    <p className="font-semibold text-lg mb-1 break-words">
                        Categoria: <span className="font-normal">{product.category_name}</span>
                    </p>
                    <p className="font-semibold text-lg mb-4 break-words">
                        Precio: <span className="font-normal">${product.price}</span>
                    </p>
                </div>
            </div>
            <div className="text-left flex-grow max-h-48 overflow-y-auto pr-4">
                <p className="font-normal text-lg mb-1 break-words whitespace-pre-line">
                    {product.description}
                </p>
            </div>
            <div className="flex flex-col justify-end ml-4">
                <Link href={{ pathname: `/admin/dashboard/products/update/${product.id}` }}>
                    <button className="rounded-md border p-2 mb-2 hover:bg-blue-100">
                        Editar Producto
                    </button>
                </Link>
                <button
                    className="rounded-md border p-2 hover:bg-red-100"
                    onClick={handleDeleteClick}
                >
                    Borrar Producto
                </button>
                <Popup
                    open={popUpVisible}
                    onClose={() => setModalOpen(false)}
                    modal
                    nested
                >
                    {(close: () => void) => (
                        <div className="bg-red-100 p-6 rounded-lg shadow-xl">
                            <div className="flex justify-center text-3xl font-bold mb-4">
                                ¿Confirmar Eliminación?
                            </div>
                            <div className="flex justify-around">
                                <button
                                    className="flex items-center text-3xl font-bold text-red-600 hover:text-red-800 transition-colors"
                                    onClick={handleConfirmDelete}
                                >
                                    Sí
                                </button>
                                <button
                                    className="flex items-center text-3xl font-bold text-green-600 hover:text-green-800 transition-colors"
                                    onClick={() => setModalOpen(false)}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    )}
                </Popup>
                <ToastContainer
                    theme="dark"
                    position="bottom-right"
                    closeOnClick
                    autoClose={2000}
                    pauseOnHover={false}
                />
            </div>
        </div>
    );
}
