import {fetchProductById} from '@/app/lib/data';

export async function GET(request: Request,{ params }: { params: Promise<{ id: string }> }
){
  const id = (await params).id
  try {
    var producto = await fetchProductById(id);
    return new Response(JSON.stringify(producto), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error 404 not found: No se encontro ningun producto con esa id'}), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}