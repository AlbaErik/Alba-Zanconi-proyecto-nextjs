import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse){ 

  try{
    let items = await new Response(req.body).text();
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

    if(response.status==201 && response.body!=null){
      return new Response(JSON.stringify(responseData.init_point), {
        headers: { 'Content-Type': 'application/json' },
        status: 201
      });
    }
    else{
      return new Response(JSON.stringify(responseData), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  }
  catch(error){
    return new Response(JSON.stringify({ error: 'Error : Pago invalido'}), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}