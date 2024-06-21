import { MercadoPagoConfig, Preference } from 'mercadopago';

export async function POST(req: any, res:any){ 

  try{
    const items = req.body;
    return new Response(items, {
      headers: { 'Content-Type': 'application/json' }
    });

    
  }
  catch(error){

  }
}