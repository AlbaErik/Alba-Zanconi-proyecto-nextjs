import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-1502233372912133-062115-a7b332adf287f355466565f8f88abac2-1521091531' });

const preference = new Preference(client);

preference.create({
  body: {
    items: [
      {
        id: "id_preferencia",
        title: 'My product',
        quantity: 1,
        unit_price: 2000
      }
    ],
  }
})
.then(console.log)
.catch(console.log);