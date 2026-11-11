import { defineConfig } from '@playwright/test'

// تُشغَّل الاختبارات على نسخة الإنتاج المبنية، بمتصفح Microsoft Edge المثبّت على الجهاز
// (غيّر channel إلى 'chrome' أو احذفه لاستخدام Chromium المنزّل عبر npx playwright install).
export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 90_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 2,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4174/',
    channel: process.env.PW_CHANNEL || 'msedge',
    viewport: { width: 1400, height: 900 },
  },
  webServer: {
    command: 'npm run build && npx vite preview --port 4174 --strictPort',
    url: 'http://localhost:4174/',
    reuseExistingServer: false,
    timeout: 180_000,
  },
})
