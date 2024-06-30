'use client';

import Link from 'next/link';
import { updateProduct } from '../../actions';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Form({
    id,
    name: initialName,
    description: initialDescription,
    price: initialPrice,
    image_url: initialImageUrl,
    category_name,
    categories
}: {
    id: string,
    name: string,
    description: string,
    price: number,
    image_url: string,
    category_name: string,
    categories: string[]
}) {
    const [formData, setFormData] = useState({
        name: initialName,
        description: initialDescription,
        price: initialPrice.toString(), // Convertir el precio a cadena
        image_url: initialImageUrl,
        category_id: category_name
    });
    const [file, setFile] = useState<File | null>(null);
    const [popUpVisible, setPopUpVisible] = useState<boolean>(false);

    const handleSubmit = async () => {
        const data = new FormData();

        data.append('id', id);
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price); // El precio ahora es una cadena
        data.append('category_id', formData.category_id);

        if (file) {
            data.append('file', file);
            try {
                const response = await fetch('/api/cloudinary', {
                    method: 'POST',
                    body: data
                });
                const result = await response.json();
                const imageUrl = result.url;

                data.append('image_url', imageUrl);

            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            data.append('image_url', initialImageUrl);
        }
        await updateProduct(data);
        setPopUpVisible(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleConfirmUpdate = () => {
        setPopUpVisible(true);
    };

    return (
        <form>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Product Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Product Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter product name"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder-gray-500"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Product Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="mb-2 block text-sm font-medium">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter product description"
                        className="peer block w-full h-48 rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder-gray-500"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Product Price */}
                <div className="mb-4">
                    <label htmlFor="price" className="mb-2 block text-sm font-medium">
                        Price
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        placeholder="Enter product price"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder-gray-500"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Image_Url */}
                <label htmlFor="file" className="mb-2 block text-lg font-medium">
                    Seleccionar Foto
                </label>
                <div className="relative mt-2 rounded-md">
                    <input
                        id="file"
                        type="file"
                        required
                        onChange={(e) => {
                            const selectedFile = e.target.files?.[0] || null;
                            setFile(selectedFile);
                        }}
                        accept="image/x-png,image/gif,image/jpeg"
                        className="block w-full text-sm text-gray-500 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
                    />
                </div>

                {/* Product Category */}
                <div className="mb-4">
                    <label htmlFor="category_id" className="mb-2 block text-sm font-medium">
                        Category
                    </label>
                    <select
                        id="category_id"
                        name="category_id"
                        className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder-gray-500"
                        value={formData.category_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="../"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <button
                    type="button"
                    onClick={handleConfirmUpdate}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                    Update Product
                </button>
            </div>

            <Popup
                open={popUpVisible}
                onClose={() => setPopUpVisible(false)}
                modal
                nested
            >
                {(close: () => void) => (
                    <div className="bg-blue-100 p-6 rounded-lg shadow-xl">
                        <div className="flex justify-center text-3xl font-bold mb-4">
                            ¿Confirmar Actualización?
                        </div>
                        <div className="flex justify-around">
                            <button
                                className="flex items-center text-3xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                onClick={handleSubmit}
                            >
                                Sí
                            </button>
                            <button
                                className="flex items-center text-3xl font-bold text-red-600 hover:text-red-800 transition-colors"
                                onClick={() => setPopUpVisible(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        </form>
    );
}
