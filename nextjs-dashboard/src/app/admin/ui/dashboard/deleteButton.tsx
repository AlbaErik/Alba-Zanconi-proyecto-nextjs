'use client'
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteProduct } from "@/app/admin/dashboard/actions";

export function DeleteProduct({ id }: { id: string }) {
    const deleteProductWithId = deleteProduct.bind(null, id);
    return (
      <form action={deleteProductWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    );
  }
  