import { test, expect } from '@playwright/test';
import { ProductoEnCarrito } from "@/app/context";

test('Get products - success', async ({ request }) => {
  // Realizamos la consulta GET a la API
  const response = await request.get('http:/localhost:3000/api/products');
  
  // Verificamos que la respuesta tiene un código de estado 200
  expect(response.status()).toBe(200);

  // Verificamos que el cuerpo de la respuesta es un JSON válido
  const productos = await response.json();
  expect(Array.isArray(productos)).toBeTruthy();

  // Validamos que los productos tienen las propiedades esperadas
  for (const producto of productos) {
    expect(producto).toHaveProperty('id');
    expect(producto).toHaveProperty('name');
    expect(producto).toHaveProperty('price');
  }

  // (Opcional) Validamos que hay al menos un producto en la lista
  expect(productos.length).toBeGreaterThan(0);
});

test('Get products/category - success', async ({ request }) => {
  // Realizamos la consulta GET a la API
  const response = await request.get(`http:/localhost:3000/api/products/category/Tarjetas_Gráficas`);
  
  // Verificamos que la respuesta tiene un código de estado 200
  expect(response.status()).toBe(200);

  // Verificamos que el cuerpo de la respuesta es un JSON válido
  const productos = await response.json();
  expect(Array.isArray(productos)).toBeTruthy();

  // Validamos que los productos tienen las propiedades esperadas
  for (const producto of productos) {
    expect(producto).toHaveProperty('id');
    expect(producto).toHaveProperty('name');
    expect(producto).toHaveProperty('price');

    // Validamos que la categoria sea la misma que especificamos
    expect(producto.category_name).toBe("Tarjetas Gráficas");
  }

  // Validamos que hay al menos un producto en la lista
  expect(productos.length).toBeGreaterThan(0);
});

test('Get products/category/ - invalid category', async ({ request }) => {
  // Realizamos la consulta GET a la API
  const response = await request.get('http:/localhost:3000/api/products/id/invalid-category');
  
  // Verificamos que la respuesta tiene un código de estado 404 (Not Found)
  expect(response.status()).toBe(404);
 
});

test('Get products/id/ - success', async ({ request }) => {
  // Realizamos la consulta GET a la API
  const productId = '31bcec1b-6933-4a13-84aa-7b60dd50ac3e';
  const response = await request.get(`http://localhost:3000/api/products/id/${productId}`);
  
  // Verificamos que la respuesta tiene un código de estado 200
  expect(response.status()).toBe(200);

  // Verificamos que el cuerpo de la respuesta es un JSON válido
  const producto = await response.json();

  // Validamos que el producto tiene las propiedades deseadas
  expect(producto).toHaveProperty('id');
  expect(producto).toHaveProperty('name');
  expect(producto).toHaveProperty('price');

  // Validamos que el id del producto coincide con el id solicitado
  expect(producto.id).toBe(productId);
 
});

test('Get products/id/ - invalid id', async ({ request }) => {
  // Realizamos la consulta GET a la API
  const response = await request.get('http:/localhost:3000/api/products/id/invalid-id');
  
  // Verificamos que la respuesta tiene un código de estado 404 (Not Found)
  expect(response.status()).toBe(404);
 
});

test('Get checkout - success', async ({ request }) => {
  const productos: ProductoEnCarrito[] = [
    {
      id: "12345",
      title: "Camiseta Deportiva",
      description: "Camiseta ideal para entrenamientos de alta intensidad.",
      unit_price: 29.99,
      picture_url: "https://example.com/images/camiseta.jpg",
      category_id: "ropa-deportiva",
      quantity: 1,
    },
    {
      id: "67890",
      title: "Pantalones de Yoga",
      description: "Pantalones cómodos para yoga y actividades de relajación.",
      unit_price: 49.99,
      picture_url: "https://example.com/images/pantalones.jpg",
      category_id: "ropa-deportiva",
      quantity: 2,
    },
  ];
  const items = "{ items:"+JSON.stringify(productos)+" }"
  const response = await fetch('http:/localhost:3000/api/checkout',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: items
  });

  var body = await response.json();
  console.log(body)

  expect(response.status).toBe(201);
 
});

test('Get checkout - invalid product', async ({ request }) => {
  const productos: ProductoEnCarrito[] = [
    {
      id: "12345",
      title: "Camiseta Deportiva",
      description: "Camiseta ideal para entrenamientos de alta intensidad.",
      unit_price: 29.99,
      picture_url: "https://example.com/images/camiseta.jpg",
      category_id: "ropa-deportiva",
      quantity: -1,
    },
    {
      id: "67890",
      title: "Pantalones de Yoga",
      description: "Pantalones cómodos para yoga y actividades de relajación.",
      unit_price: 49.99,
      picture_url: "https://example.com/images/pantalones.jpg",
      category_id: "ropa-deportiva",
      quantity: 2,
    },
  ];
  const items = "{ items:"+JSON.stringify(productos)+" }"
  const response = await fetch('http:/localhost:3000/api/checkout',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: items
  });

  var body = await response.json();
  console.log(body)

  expect(response.status).toBe(500);
 
});

test('Get checkout - no products', async ({ request }) => {
  const productos: ProductoEnCarrito[] = [];
  const items = "{ items:"+JSON.stringify(productos)+" }"
  const response = await fetch('http:/localhost:3000/api/checkout',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: items
  });

  var body = await response.json();
  console.log(body)

  expect(response.status).toBe(500);
 
});