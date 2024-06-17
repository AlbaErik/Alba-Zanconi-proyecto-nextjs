import {fetchIdCategoryByName, fetchProductsByCategory} from '@/app/lib/data';

export async function GET(){ 
  try {
    var categoria = await fetchIdCategoryByName("Discos Duros");
    var productos = await fetchProductsByCategory(categoria[0]);
    return new Response(JSON.stringify(productos), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return new Response(JSON.stringify({ error: 'Error 404 not found: No se encontro ningun producto con esa id'}), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}