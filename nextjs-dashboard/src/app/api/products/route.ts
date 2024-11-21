import { fetchAllProducts, fetchIdCategoryByName, fetchProductsByCategory } from '@/app/lib/data';

export async function GET(req: any){
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  var category_name = ""+searchParams.get('category_name');
  var new_category_name = category_name.replaceAll("_", " ");

  if(searchParams.get('category_name')!==null){

    try{
      
      var categoria = await fetchIdCategoryByName(new_category_name);
      var productos = await fetchProductsByCategory(categoria[0]);

      return new Response(JSON.stringify(productos), {
        headers: { 'Content-Type': 'application/json' }
     });
    }
    catch(error){
      return new Response(JSON.stringify({ error: 'Error interno del servidor '}), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
  }
  else{

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
}