import {fetchProductById} from '@/app/lib/data';

export async function GET(req: any){ 
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const id = ""+searchParams.get('id');

  if(searchParams.get('id')==null){
    return new Response(JSON.stringify({ error: 'Error 500: Debe ingresar una id para el producto'}), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
    
  try {
    var producto = await fetchProductById(id);
    return new Response(JSON.stringify(producto), {
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