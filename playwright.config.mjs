import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://aiflows.help',
    headless: true,
  },
}); 