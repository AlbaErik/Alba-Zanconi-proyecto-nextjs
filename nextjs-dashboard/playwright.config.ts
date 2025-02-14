import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';

/**
 * Read environment variables from file.
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

// Verificar si `auth.json` existe; si no, ejecuta el setup de autenticación
if (!fs.existsSync('auth.json')) {
  console.warn('⚠️  No se encontró auth.json. Generando sesión...');
  require('child_process').execSync('npx playwright test setup.spec.ts', { stdio: 'inherit' });
}

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. */
  reporter: 'html',
  /* Shared settings for all the projects below. */
  use: {
    /* Base URL */
    // baseURL: 'http://127.0.0.1:3000',

    /* Mantener sesión iniciada */
    storageState: 'auth.json',

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${process.env.API_TOKEN}`,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
