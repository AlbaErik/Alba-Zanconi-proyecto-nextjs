import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'parallel' });
test.use({ storageState: 'auth.json' });


test('Login exitoso con credenciales válidas', async ({ page }) => {

  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard');

  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.waitForTimeout(5000);

  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/account/adminLogin');

  // Completar el formulario de login
  await page.fill('input[name="email"]', 'admin@admin.com');
  await page.fill('input[name="password"]', 'admin');
  await page.click('button:has-text("Log in")');

  // Verificar que el usuario fue redirigido al dashboard
  await expect(page).toHaveURL('https://alba-zanconi-proyecto-nextjs.vercel.app/account/adminLogin');
});



test('Login clave incorrecta', async ({ page }) => {
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard');

  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.waitForTimeout(5000);

  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/account/adminLogin');

  // Completar el formulario de login
  await page.fill('input[name="email"]', 'admin@admin.com');
  await page.fill('input[name="password"]', 'sdfg');
  await page.click('button:has-text("Log in")');

  await page.waitForTimeout(5000);

  // Esperar que aparezca el div de error con el icono y el mensaje
  const errorDiv = page.locator('div.flex.h-8.items-end.space-x-1[aria-live="polite"][aria-atomic="true"]');
  await expect(errorDiv).toBeVisible();

  // Verificar que dentro del div se encuentra el mensaje esperado
  const errorMessage = errorDiv.locator('p.text-sm.text-red-500');
  await expect(errorMessage).toHaveText('Something went wrong.');
});


test('Login usuario incorrecto', async ({ page }) => {

  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard');

  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.waitForTimeout(5000);
  await page.click('a.text-gray-600:has-text("Ingresar")');

  // Completar el formulario de login
  await page.fill('input[name="email"]', 'aasdfasf@admin.com');
  await page.fill('input[name="password"]', 'admin');
  await page.click('button:has-text("Log in")');

  await page.waitForTimeout(5000);

  // Esperar que aparezca el div de error con el icono y el mensaje
  const errorDiv = page.locator('div.flex.h-8.items-end.space-x-1[aria-live="polite"][aria-atomic="true"]');
  await expect(errorDiv).toBeVisible();

  // Verificar que dentro del div se encuentra el mensaje esperado
  const errorMessage = errorDiv.locator('p.text-sm.text-red-500');
  await expect(errorMessage).toHaveText('Something went wrong.');
});
