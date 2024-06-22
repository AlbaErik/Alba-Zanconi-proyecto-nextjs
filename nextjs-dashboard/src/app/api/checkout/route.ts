export async function POST(req: Request, res:any){ 

  try{
    let items = await new Response(req.body).text();
    console.log("Items: "+items)
   
    const response = await fetch(`https://api.mercadopago.com/checkout/preferences`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer APP_USR-1502233372912133-062115-a7b332adf287f355466565f8f88abac2-1521091531'
      },
      body: items
    })

    const responseData = await response.json();

    if(response.status==201){
      return new Response(JSON.stringify(responseData), {
        headers: { 'Content-Type': 'application/json' },
        status: 201
      });
    }
    else{
      return new Response(JSON.stringify({ error: 'Error : Solicitud invalida'}), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  }
  catch(error){
    return new Response(JSON.stringify({ error: 'Error : Solicitud invalida'}), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}