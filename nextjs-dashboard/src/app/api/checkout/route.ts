export async function POST(req: Request, res:any){ 

  try{
    let items = await new Response(req.body).text();
    console.log("Items: "+items)
    const access_token = process.env.ACCESS_TOKEN_MP;
    const authorization= 'Bearer '+access_token+''
   
    const response = await fetch(`https://api.mercadopago.com/checkout/preferences`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization
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