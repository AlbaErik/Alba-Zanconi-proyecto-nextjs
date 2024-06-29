'use client';

import Link from 'next/link';
import { createProduct } from '../../actions';
import { useFormState } from 'react-dom';

export default function Form({ categories }: { categories: string[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);

  return (
    <form onSubmit={dispatch}>
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
            required
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
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
            required
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
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
            required
          />
          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state.errors?.price &&
              state.errors.price.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Image URL */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            type="url"
            placeholder="Enter product image URL"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm outline-2 placeholder-gray-500"
            required
          />
          <div id="image_url-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image_url &&
              state.errors.image_url.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
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
            defaultValue=""
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
          <div id="category_id-error" aria-live="polite" aria-atomic="true">
            {state.errors?.category_id &&
              state.errors.category_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
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
