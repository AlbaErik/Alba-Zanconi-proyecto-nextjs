import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

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

test('Get product - success', async ({ request }) => {
  // Realizamos la consulta GET a la API
  const response = await request.get('http:/localhost:3000/api/product?id=31bcec1b-6933-4a13-84aa-7b60dd50ac3e');
  
  // Verificamos que la respuesta tiene un código de estado 200
  expect(response.status()).toBe(200);

  // Verificamos que el cuerpo de la respuesta es un JSON válido
  const producto = await response.json();

  // Validamos que el producto tiene las propiedades deseadas
  expect(producto).toHaveProperty('id');
  expect(producto).toHaveProperty('name');
  expect(producto).toHaveProperty('price');
 
});

test('Get product - invalid id', async ({ request }) => {
  // Realizamos la consulta GET a la API
  const response = await request.get('http:/localhost:3000/api/product?id=id-invalido');
  
  // Verificamos que la respuesta tiene un código de estado 404 (Not Found)
  expect(response.status()).toBe(404);
 
});

test('Get product - id not specified', async ({ request }) => {
  // Realizamos la consulta GET a la API
  const response = await request.get('http:/localhost:3000/api/product');
  
  // Verificamos que la respuesta tiene un código de estado 500 (Error interno del servidor)
  expect(response.status()).toBe(500);
 
});