import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const saveKey = "midd-campus-rpg.save.v1";

test("keyboard arrival, persistence, layout and version-bound feedback", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { name: /Your next chapter/ })).toBeVisible();
  await expect(page.getByText("UNOFFICIAL · STORY PROP")).toBeVisible();
  await expect(page.getByText("Not affiliated with, endorsed by, or speaking for Middlebury College.")).toBeVisible();
  expect(await page.evaluate(() => document.fonts.check('18px "Atkinson Hyperlegible Mono"'))).toBe(true);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Enter a city or region");
  await expect(page.getByLabel("Traveling from")).toBeFocused();
  await page.getByLabel("Traveling from").fill("Your home region");
  const shotDir = `work/screenshots/${info.project.name}`;
  mkdirSync(shotDir, { recursive: true });
  await page.getByLabel("Traveling from").blur();
  await page.mouse.move(0, 0);
  await page.screenshot({ path: `${shotDir}/letter.png`, fullPage: true });
  await page.getByLabel("Traveling from").focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Continue", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Train", exact: true })).toBeFocused();
  await expect(page.getByText(/From Your home region/)).toBeVisible();
  await expect(page.getByRole("img", { name: /quiet window view/ })).toBeVisible();
  const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), saveKey);
  expect(saved.origin).toBe("Your home region");
  expect(saved.placeId).toBe("middlebury-station");
  await page.getByRole("heading", { name: "Train", exact: true }).blur();
  await page.mouse.move(0, 0);
  await page.screenshot({ path: `${shotDir}/train.png`, fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Platform", exact: true })).toBeVisible();
  await page.mouse.move(0, 0);
  await page.screenshot({ path: `${shotDir}/platform.png`, fullPage: true });
  const geometry = await page.locator(".platform-map").evaluate((node) => ({ width: node.clientWidth, height: node.clientHeight, transform: getComputedStyle(node).transform }));
  expect([geometry.width, geometry.height]).toEqual([480, 270]);
  expect(geometry.transform).toBe(info.project.name === "desktop" ? "matrix(2, 0, 0, 2, 0, 0)" : "none");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Platform", exact: true })).toBeVisible();
  const link = await page.getByRole("link", { name: "Continue", exact: true }).getAttribute("href");
  expect(link).toMatch(/^feedback\/index.html\?demo=D1-letter-train&version=[a-f0-9]{40}$/);
  await page.getByRole("link", { name: "Continue", exact: true }).click();
  await expect(page).toHaveURL(/feedback\/index.html\?demo=D1-letter-train&version=[a-f0-9]{40}/);
  await expect(page.getByRole("heading", { name: "Middlebury campus RPG", exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test("a rejected save remains unchanged while a new in-memory trip can finish", async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, '{"version":999,"notes":["keep me"]}'), saveKey);
  await page.goto("/");
  await expect(page.getByRole("alert")).toContainText("kept unchanged");
  await page.getByLabel("Traveling from").fill("New origin");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Platform", exact: true })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), saveKey)).toBe('{"version":999,"notes":["keep me"]}');
});

test("blocked storage still permits the complete arrival without a crash", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage blocked"); } }));
  await page.goto("/");
  await expect(page.getByRole("alert")).toContainText("couldn’t save");
  await page.getByLabel("Traveling from").fill("A".repeat(80));
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Train", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Platform", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("link", { name: "Continue", exact: true }).click();
  await expect(page.locator("#question-title")).toBeVisible();
});
