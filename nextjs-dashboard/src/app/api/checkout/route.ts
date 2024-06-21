import { error } from 'console';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export async function POST(req: any, res:any){ 

  function crearPreferenciaDemo(){

    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-1502233372912133-062115-a7b332adf287f355466565f8f88abac2-1521091531' });
    const preference = new Preference(client);

    return preference.create({
      body: {
        "items": [
        {
          id: '123',
          title: 'Mi producto',
          quantity: 1,
          unit_price: 2000
        }
    ]
      }
    })
    .then(console.log)
    .catch(console.log);
  }

  function crearPreferencia(items: []){

    const client = new MercadoPagoConfig({ accessToken: 'APP_USR-1502233372912133-062115-a7b332adf287f355466565f8f88abac2-1521091531' });
    const preference = new Preference(client);

    return preference.create({
      body: {
        items: items
      }
    })
    .then(console.log)
    .catch(console.log);
  }
  
  let preferencia = crearPreferenciaDemo();
  try{
    const {items} = req.body;
    //let preferencia = crearPreferencia(items);
    
    
    const response = await fetch("https://api.mercadopago.com/checkout/preferences",{
      method: 'POST',
      body: JSON.stringify(preferencia)
    })
    if(response.body){
      res.status(200).json({ body: response.body });
    }
    else{
      return new Response(JSON.stringify({ error: 'Error :'+response.body}), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });

    
      
  
  }
}
  catch(error){
    return new Response(JSON.stringify({ error: 'Error :'+JSON.stringify(preferencia)}), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
    

  }
}