import { existsSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./work/playwright-results",
  reporter: "list",
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:4173",
    launchOptions: { executablePath: existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined, args: ["--no-sandbox"] },
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 720 } } },
    { name: "phone", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: { command: "npm run preview", url: "http://127.0.0.1:4173", reuseExistingServer: false },
});
