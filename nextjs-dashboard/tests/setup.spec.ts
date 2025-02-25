import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Guardar sesión', async ({ page }) => {
  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/account/adminLogin');

  await page.fill('input[name="email"]', process.env.ADMIN_USER || 'admin@admin.com');
  await page.fill('input[name="password"]', process.env.ADMIN_PASS || 'admin');
  await page.click('button:has-text("Log in")');
  await page.waitForTimeout(3000);
  await page.waitForURL('https://alba-zanconi-proyecto-nextjs.vercel.app/account/adminLogin');

  await page.goto('https://alba-zanconi-proyecto-nextjs.vercel.app/admin/dashboard');

  // Guardar el estado de la sesión
  await page.context().storageState({ path: 'nextjs-dashboard/tests/auth.json' });
});
