import { test, expect, Page } from '@playwright/test';
test.describe.configure({ mode: 'parallel' });
test.use({ storageState: 'auth.json' });

test('Usuarios anónimos pueden ver los productos', async ({ page }) => {
    // Logout del admin
    await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard');

    await page.getByRole('button', { name: 'Sign Out' }).click();
    await page.waitForTimeout(5000);

    await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/account/adminLogin');

    // Completar el formulario de login
    await page.fill('input[name="email"]', 'user1@example.com');
    await page.fill('input[name="password"]', 'user1');
    await page.click('button:has-text("Log in")');

    await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/user');
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    await page.waitForTimeout(5000);

    const productosDiv = await page.locator('#productos');
    await expect(productosDiv).toBeVisible();
});

test('Usuarios anónimos no pueden acceder al dashboard del admin', async ({ page }) => {

    // Logout del admin
    await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard');

    await page.getByRole('button', { name: 'Sign Out' }).click();
    await page.waitForTimeout(5000);

    await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/user');

    //Intenta acceder al dashboard del admin
    await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard');

    // Se redirige al login
    await expect(page).toHaveURL('https://alba-zanconi-proyecto-nextjs.vercel.app/?callbackUrl=https%3A%2F%2Falba-zanconi-proyecto-nextjs.vercel.app%2Fadmin%2Fdashboard');
});

test('Cliente autenticado no puede acceder al dashboard del admin', async ({ page }) => {
    // Logout del admin
    await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard');

    await page.getByRole('button', { name: 'Sign Out' }).click();

    await page.click('a.text-gray-600:has-text("Ingresar")');

    // Completar el formulario de login
    await page.fill('input[name="email"]', 'user1@example.com');

    await page.fill('input[name="password"]', 'user1');
    await page.click('button:has-text("Log in")');
    await page.waitForTimeout(5000);

    await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard');
    await page.waitForTimeout(3000);
    await expect(page).not.toHaveURL('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard'); // No debe acceder
    await expect(page).toHaveURL('https://alba-zanconi-proyecto-nextjs.vercel.app/user'); // Redirige a la pagina de usuario
});