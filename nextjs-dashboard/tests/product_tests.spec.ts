import { test, expect } from '@playwright/test';


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
  // Ir a la página de login
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/account/adminLogin');

  // Llenar el formulario de login
  await page.fill('input[name="email"]', process.env.ADMIN_USER || 'admin@admin.com');
  await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'admin');

  // Hacer clic en el botón de login y esperar que redirija al dashboard
  await page.click('button:has-text("Log in")');
  await page.waitForTimeout(3000);
  await page.waitForURL('https://alba-zanconi-proyecto-nextjs.vercel.app/account/adminLogin');
  

  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard');

  // Ir a la página de creación de productos
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard/products/create');


  const productName = 'Nuevo Producto con Playwright';

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
  await searchInput.fill("Nuevo Producto con Playwright"); // Escribe "test" en el input
  await searchInput.press("Enter"); // Simula presionar Enter para buscar


  const productLocator = page.locator('div.rounded-xl.bg-blue-50').first();
  await expect(productLocator).toContainText("Nuevo Producto con Playwright");

  await page.screenshot({ path: 'screenshot.png', fullPage: true });

});
