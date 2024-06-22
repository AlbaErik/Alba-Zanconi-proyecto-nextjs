"use server";
import { revalidatePath } from "next/cache";
import { sql } from '@vercel/postgres';

export async function deleteProduct(id: string) {
    console.log(`Deleting product with id: ${id}`);
    await sql `DELETE FROM store.products WHERE id = ${id}`;
    revalidatePath('/dashboard/products');
  }