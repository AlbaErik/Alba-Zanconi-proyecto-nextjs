import { test, expect, Page } from '@playwright/test';
test.describe.configure({ mode: 'parallel' });

test('Usuarios anónimos pueden ver los productos', async ({ page, context }) => {

    await page.goto('http:/localhost:3000/account/adminLogin');

    // Completar el formulario de login
    await page.fill('input[name="email"]', 'user1@example.com');
    await page.fill('input[name="password"]', 'user1');
    await page.click('button:has-text("Log in")');

    await page.goto('http:/localhost:3000/user');
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    await page.waitForTimeout(5000);

    const productosDiv = await page.locator('#productos');
    await expect(productosDiv).toBeVisible();
    await context.clearCookies();
    await context.clearPermissions();
});

test('Usuarios anónimos no pueden acceder al dashboard del admin', async ({ page, context }) => {

    await page.goto('http:/localhost:3000/user');

    //Intenta acceder al dashboard del admin
    await page.goto('http:/localhost:3000/admin/dashboard');

    // Se redirige al login
    await expect(page).toHaveURL('http://localhost:3000/?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fadmin%2Fdashboard');
    await context.clearCookies();
    await context.clearPermissions();
});

test('Cliente autenticado no puede acceder al dashboard del admin', async ({ page, context }) => {

    await page.goto('http:/localhost:3000/account/adminLogin');

    // Completar el formulario de login
    await page.fill('input[name="email"]', 'user1@example.com');

    await page.fill('input[name="password"]', 'user1');
    await page.click('button:has-text("Log in")');
    await page.waitForTimeout(5000);

    await page.goto('http:/localhost:3000/admin/dashboard');
    await page.waitForTimeout(3000);
    await expect(page).not.toHaveURL('http:/localhost:3000/admin/dashboard'); // No debe acceder
    await expect(page).toHaveURL('http:/localhost:3000/user'); // Redirige a la pagina de usuario
    await context.clearCookies();
    await context.clearPermissions();
});