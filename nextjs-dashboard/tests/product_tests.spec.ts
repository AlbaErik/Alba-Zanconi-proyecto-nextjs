import { test, expect } from '@playwright/test';
import path from 'path';

test.use({ storageState: 'auth.json' });
function generarCadenaAleatoriaTS(longitud: number = 5): string {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: longitud }, () => caracteres[Math.floor(Math.random() * caracteres.length)]).join('');
}

console.log(generarCadenaAleatoriaTS());

test('Crear un producto tras iniciar sesion', async ({ page }) => {

  // Ir a la página de creación de productos
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products/create');

  const productName = 'Nuevo Producto con Playwright Fallout ' + generarCadenaAleatoriaTS();

  await page.fill('#name', productName);
  await page.fill('#description', 'Es un nuevo producto creado con Playwright');
  await page.fill('#price', '100');

  const filePath = path.join(process.cwd(), 'nextjs-dashboard', 'tests', 'fallout.jpeg');
  await page.setInputFiles('#file', filePath);

  await page.selectOption('#category_id', { label: 'Tarjetas Gráficas' });

  await page.click('button:has-text("Create Product")');
  await page.click('button.flex.items-center.text-3xl.font-bold.text-blue-600');
  await page.waitForTimeout(5000);

  await page.waitForURL('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products');

  // Buscar el producto
  console.log("El producto nuevo es: " + productName);
  const searchInput = page.locator('input[placeholder="Ingrese un producto..."]');
  await searchInput.fill(productName);
  await searchInput.press("Enter");

  const productLocator = page.locator('div.rounded-xl.bg-blue-50').first();
  await expect(productLocator).toContainText(productName);

});


test('Editar un producto tras iniciar sesion', async ({ page }) => {

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

  const filePath = path.join(process.cwd(), 'nextjs-dashboard', 'tests', 'fallout.jpeg');
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
});


test('Eliminar un producto y verificar que no exista en la busqueda', async ({ page }) => {
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products');

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

  console.log('Eliminando producto: ${firstCardTitle} (UUID: ${productUUID})');

  // Hacer clic en "Borrar Producto"
  await card.locator('button:has-text("Borrar Producto")').click();

  // Confirmar eliminación
  await page.locator('button:text("Si")').waitFor();
  await page.locator('button:text("Si")').click();

  // Esperar a que la Card desaparezca
  await page.waitForTimeout(5000);

  // Usar el buscador para buscar el producto eliminado
  console.log('Buscando productos con el título: "${firstCardTitle}"');
  await page.fill('input[placeholder="Ingrese un producto..."]', firstCardTitle);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);

  // Verificar que ningún producto encontrado tenga el UUID eliminado
  const foundCards = await page.locator('.rounded-xl.bg-blue-50').all();
  for (const foundCard of foundCards) {
    const editButton = await foundCard.locator('a[href*="/admin/dashboard/products/update/"]');
    const foundHref = await editButton.getAttribute('href') || "";
    const foundUUIDMatch = foundHref.match(/update\/([a-f0-9-]+)/);
    const foundUUID = foundUUIDMatch ? foundUUIDMatch[1] : null;

    console.log(' Revisando producto encontrado - UUID: ${foundUUID}');

    expect(foundUUID).not.toBe(productUUID);
  }

  console.log(' Producto eliminado correctamente y no se encontró en la búsqueda: ${firstCardTitle} (UUID: ${productUUID})');
});


test('Ver lista de productos', async ({ page }) => {
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products');

  // Esperar a que carguen los productos
  await page.waitForSelector('.rounded-xl.bg-blue-50');

  // Contar cuántos productos hay en la lista
  const productCards = await page.locator('.rounded-xl.bg-blue-50').count();

  console.log(' Se encontraron ${productCards} productos en la lista.');
  expect(productCards).toBeGreaterThan(0);
});


test('Obtener detalles del primer producto en la lista', async ({ page }) => {
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products');

  // Obtener la primera Card de la lista
  const firstCard = await page.locator('.rounded-xl.bg-blue-50').first();

  // Obtener los detalles del producto
  const title = await firstCard.locator('h3.ml-2.text-sm.font-medium').textContent() || "";
  const category = await firstCard.locator('p:has-text("Categoria:") span').textContent() || "";
  const price = await firstCard.locator('p:has-text("Precio:") span').textContent() || "";
  const description = await firstCard.locator('p:has-text("Descripcion:") span').textContent() || "";

  console.log('Producto encontrado:');
  console.log(' Título: ${title}');
  console.log(' Categoría: ${category}');
  console.log(' Precio: ${price}');
  console.log(' Descripción: ${description}');

  // Verificar que todos los campos tengan valores
  expect(title).not.toBe("");
  expect(category).not.toBe("");
  expect(price).not.toBe("");
  expect(description).not.toBe("");
});


test('Error al crear un producto sin seleccionar imagen', async ({ page }) => {
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products/create');

  // Hacer clic en el botón de crear producto sin seleccionar una imagen
  await page.locator('button:has-text("Create Product")').click();

  // Verificar que aparece el mensaje de error sobre la imagen
  const errorImage = page.locator('p.text-red-500:has-text("Por favor seleccione una imagen antes de crear el producto.")');
  await expect(errorImage).toBeVisible();
});

test('Error al crear un producto sin completar todos los campos', async ({ page }) => {
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products/create');

  // Subir una imagen local
  const filePath = path.join(process.cwd(), 'nextjs-dashboard', 'tests', 'fallout.jpeg');
  await page.setInputFiles('#file', filePath);

  // Hacer clic en el botón de crear producto sin completar otros campos
  await page.locator('button:has-text("Create Product")').click();

  // Verificar que aparece el mensaje de error sobre los campos faltantes
  const errorFields = page.locator('p.text-red-500:has-text("Por favor complete todos los campos antes de crear el producto.")');
  await expect(errorFields).toBeVisible();
});


test('Falla al eliminar un producto con URL alterada (404)', async ({ page }) => {
  // Ir a la página de productos
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products');

  // Alterar la URL con un UUID inválido
  const uuidAlterado = '00000000-0000-0000-0000-000000000000';
  const deleteUrl = `https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products/delete/${uuidAlterado}`;

  // Intentar acceder a la URL falsa
  await page.goto(deleteUrl);

  // Verificar que la página muestra un error 404
  await expect(page).toHaveTitle(/404/i);
  await expect(page.locator('text=This page could not be found')).toBeVisible();
});