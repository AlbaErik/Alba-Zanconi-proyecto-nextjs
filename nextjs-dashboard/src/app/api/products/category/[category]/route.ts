import {fetchIdCategoryByName, fetchProductsByCategory} from '@/app/lib/data';

export async function GET(request: Request,{ params }: { params: Promise<{ category: string }> }
){
  const category = (await params).category
  var category_name = category.replaceAll("_", " ");
  try{
      
    var categoria = await fetchIdCategoryByName(category_name);
    var productos = await fetchProductsByCategory(categoria[0]);

    return new Response(JSON.stringify(productos), {
      headers: { 'Content-Type': 'application/json' }
   });

  }
  catch(error){
    return new Response(JSON.stringify({ error: 'Error 404 not found: Categoria no encontrada '}), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}