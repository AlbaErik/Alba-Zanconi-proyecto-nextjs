"use server";
import { revalidatePath } from "next/cache";
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { redirect } from "next/navigation";
import { fetchCategoryById, fetchCategoryByName } from "@/app/lib/data";
const { v4: uuidv4 } = require('uuid');


export async function deleteProduct(id: string) {
  console.log(`Deleting product with id: ${id}`);
  await sql`DELETE FROM store.products WHERE id = ${id}`;
  revalidatePath('src/app/admin/dashboard/products');
}






const FormSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(0.01, { message: 'Ingrese un valor mayor a $0.' }), // Corregido para asegurar que el precio sea mayor a 0
  image_url: z.string().url({ message: 'Ingrese una URL válida para la imagen.' }), // Validación de URL
  category_id: z.string(),
});

const CreateProduct = FormSchema;

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    image_url?: string[];
    category_id?: string[];
  };
  message?: string;
};

export async function createProduct( formData: FormData) {
  console.log('Creating product...');	
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: parseFloat(formData.get('price') as string), // Convertir precio a número
    image_url: formData.get('image_url') as string,
    category_id: formData.get('category_id') as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos vacíos o datos incorrectos. No se puede crear el producto.',
    };
  }

  const { name, description, price, image_url, category_id } = validatedFields.data;

  const category_name = await fetchCategoryByName(category_id);
  console.log("category id: ", category_name);
  try {
    await sql`
      INSERT INTO store.products (id, name, description, price, image_url, category_id)
      VALUES (${uuidv4()}, ${name}, ${description}, ${price}, ${image_url}, ${category_name})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Error de base de datos. No se pudo crear el producto.',
    };
  }

  revalidatePath('admin/dashboard/products');
  redirect('../products');
}

