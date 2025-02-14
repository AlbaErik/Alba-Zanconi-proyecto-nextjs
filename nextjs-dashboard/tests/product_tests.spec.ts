import { test, expect } from '@playwright/test';
import { title } from 'process';
import { string } from 'zod';


/*
  Tests de éxito y fracaso en altas, bajas y modificaciones: 
  crear, 
  editar y elminar un producto exitosamente, 
  falla en creación o modificación de un producto (por campos inválidos o faltantes), 
  falla en eliminacion de un producto (tal vez por URL alterada), 
  ver listas de productos, 
  ver detalles de un producto, 
  login exitoso y fallido, 
  acceso a paginas restringidas, 
  entre otros.
*/

test('Crear un producto tras iniciar sesión', async ({ page }) => {

  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  // Ir a la página de creación de productos
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products/create');


  const productName = '123 Nuevo Producto con Playwright';
  await page.screenshot({ path: 'screenshot-asdf.png', fullPage: true });

  await page.fill('#name', productName);
  await page.fill('#description', 'Es un nuevo producto creado con Playwright');
  await page.fill('#price', '100');

  const filePath = 'D:/IAW/Alba-Zanconi-proyecto-nextjs/nextjs-dashboard/public/logo.png';
  await page.setInputFiles('#file', filePath);
  await page.selectOption('#category_id', { label: 'Tarjetas Gráficas' });

  await page.click('button:has-text("Create Product")');
  await page.click('button.flex.items-center.text-3xl.font-bold.text-blue-600');
  await page.waitForTimeout(5000);

  await page.waitForURL('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products');

  // Buscar el producto
  const searchInput = page.locator('input[placeholder="Ingrese un producto..."]');
  await searchInput.fill("Nuevo Producto con Playwright");
  await searchInput.press("Enter");


  const productLocator = page.locator('div.rounded-xl.bg-blue-50').first();
  await expect(productLocator).toContainText("Nuevo Producto con Playwright");

  await page.screenshot({ path: 'screenshot.png', fullPage: true });

});


test('Editar un producto tras iniciar sesión', async ({ page }) => {

  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products');

  //Obtengo la primer Card de la lista
  const card = await page.locator('.rounded-xl.bg-blue-50').first();
  await card.locator('button:has-text("Editar Producto")').click();

  // Completo los datos del formulario
  const productName = "Producto editado con Playwright";
  const description = "Es un producto editado con Playwright";
  const price = "100";

  await page.fill('#name', productName);
  await page.fill('#description', description);
  await page.fill('#price', price);

  const filePath = 'D:/IAW/Alba-Zanconi-proyecto-nextjs/nextjs-dashboard/public/logo.png';
  await page.setInputFiles('#file', filePath);
  await page.selectOption('#category_id', { label: 'Tarjetas Gráficas' });

  //Guardo cambios y confirmo
  await page.click('button:has-text("Guardar")');
  await page.waitForTimeout(1000);

  await page.locator('button:text("Si")').waitFor();
  await page.locator('button:text("Si")').click();
  await page.waitForTimeout(5000);

  // Buscar el producto
  const searchInput = page.locator('input[placeholder="Ingrese un producto..."]');
  await searchInput.fill(productName);
  await searchInput.press("Enter");

  const productLocator = page.locator('div.rounded-xl.bg-blue-50').first();
  await expect(productLocator).toContainText(productName);
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

});


test('Eliminar un producto y verificar que no exista en la búsqueda', async ({ page }) => {
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products');
  await page.screenshot({ path: 'primerCard.png', fullPage: true });

  // Obtengo la primera Card de la lista
  const card = await page.locator('.rounded-xl.bg-blue-50').first();
  const firstCardTitle = await card.locator('h3.ml-2.text-sm.font-medium').textContent() || "";

  // Obtengo el UUID del producto desde el enlace "Editar Producto"
  const editButton = await card.locator('a[href*="/admin/dashboard/products/update/"]');
  const productHref = await editButton.getAttribute('href') || "";
  const uuidMatch = productHref.match(/update\/([a-f0-9-]+)/);
  const productUUID = uuidMatch ? uuidMatch[1] : null;

  if (!productUUID) {
    throw new Error("No se pudo obtener el UUID del producto.");
  }

  console.log(`Eliminando producto: ${firstCardTitle} (UUID: ${productUUID})`);

  // Hacer clic en "Borrar Producto"
  await card.locator('button:has-text("Borrar Producto")').click();

  // Confirmar eliminación
  await page.locator('button:text("Si")').waitFor();
  await page.locator('button:text("Si")').click();

  // Esperar a que la Card desaparezca
  await page.waitForTimeout(5000);

  // Usar el buscador para buscar el producto eliminado
  console.log(`🔍 Buscando productos con el título: "${firstCardTitle}"`);
  await page.fill('input[placeholder="Ingrese un producto..."]', firstCardTitle);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000); // Esperar a que los resultados se actualicen

  await page.screenshot({ path: 'CardEliminada.png', fullPage: true });

  // Verificar que ningún producto encontrado tenga el UUID eliminado
  const foundCards = await page.locator('.rounded-xl.bg-blue-50').all();
  for (const foundCard of foundCards) {
    const editButton = await foundCard.locator('a[href*="/admin/dashboard/products/update/"]');
    const foundHref = await editButton.getAttribute('href') || "";
    const foundUUIDMatch = foundHref.match(/update\/([a-f0-9-]+)/);
    const foundUUID = foundUUIDMatch ? foundUUIDMatch[1] : null;

    console.log(`🔍 Revisando producto encontrado - UUID: ${foundUUID}`);

    expect(foundUUID).not.toBe(productUUID);
  }

  console.log(`✅ Producto eliminado correctamente y no se encontró en la búsqueda: ${firstCardTitle} (UUID: ${productUUID})`);
});

