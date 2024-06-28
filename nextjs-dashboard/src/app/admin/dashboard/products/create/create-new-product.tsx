'use client';

import Link from 'next/link';
import { createProduct } from '../../actions';
import { useState } from 'react';

export default function Form({ categories }: { categories: string[] }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category_id: ''
  });

  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData();

    if (file) {
      data.append('file', file);
    }

    try {

      const response = await fetch('/api/cloudinary', {
        method: 'POST',
        body: data
      });

      const result = await response.json();
      const imageUrl = result.url;

      setFormData(prevState => ({
        ...prevState,
        image_url: imageUrl
      }));

      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('image_url', imageUrl);
      data.append('category_id', formData.category_id);

      await createProduct(data);
      
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder-gray-500"
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
          href="/admin/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Create Product
        </button>
      </div>
    </form>
  );
}
