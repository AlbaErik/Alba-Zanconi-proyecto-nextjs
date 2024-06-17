import { fetchAllProducts } from '@/app/lib/data';

export async function GET(){
  try {
    var productos = await fetchAllProducts();
    return new Response(JSON.stringify(productos), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}