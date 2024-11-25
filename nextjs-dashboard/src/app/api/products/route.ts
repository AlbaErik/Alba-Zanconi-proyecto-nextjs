import { fetchAllProducts} from '@/app/lib/data';

export async function GET(req: any){
    try {
      var productos = await fetchAllProducts();

      return new Response(JSON.stringify(productos), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {

      return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
}