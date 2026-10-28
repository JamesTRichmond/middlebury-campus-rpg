import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

const saveKey = "midd-campus-rpg.save.v1";

test("keyboard arrival, persistence, layout and version-bound feedback", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { name: /You’re accepted/ })).toBeVisible();
  await expect(page.getByText("UNOFFICIAL ACCEPTANCE LETTER")).toBeVisible();
  await expect(page.getByText("Not affiliated with, endorsed by, or speaking for Middlebury College.")).toBeVisible();
  expect(await page.evaluate(() => document.fonts.check('18px "Atkinson Hyperlegible Mono"'))).toBe(true);
  await page.getByRole("button", { name: "Board the train", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Choose a city or region");
  await expect(page.getByLabel("Your character is traveling from")).toBeFocused();
  await page.getByLabel("Your character is traveling from").fill("Your home region");
  const shotDir = `work/screenshots/${info.project.name}`;
  mkdirSync(shotDir, { recursive: true });
  await page.getByLabel("Your character is traveling from").blur();
  await page.mouse.move(0, 0);
  await page.screenshot({ path: `${shotDir}/letter.png`, fullPage: true });
  await page.getByLabel("Your character is traveling from").focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Board the train", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "On the way to Vermont", exact: true })).toBeFocused();
  await expect(page.getByText(/journey begins in Your home region/)).toBeVisible();
  await expect(page.getByRole("img", { name: /Train window/ })).toBeVisible();
  const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), saveKey);
  expect(saved.origin).toBe("Your home region");
  expect(saved.placeId).toBe("middlebury-station");
  await page.getByRole("heading", { name: "On the way to Vermont", exact: true }).blur();
  await page.mouse.move(0, 0);
  await page.screenshot({ path: `${shotDir}/train.png`, fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await finishRide(page);
  await expect(page.getByRole("heading", { name: "Welcome to Middlebury", exact: true })).toBeVisible();
  await page.mouse.move(0, 0);
  await page.screenshot({ path: `${shotDir}/platform.png`, fullPage: true });
  const geometry = await page.locator(".platform-map").evaluate((node) => ({ width: node.clientWidth, height: node.clientHeight, transform: getComputedStyle(node).transform }));
  expect([geometry.width, geometry.height]).toEqual([480, 270]);
  expect(geometry.transform).toBe("none");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Welcome to Middlebury", exact: true })).toBeVisible();
  const link = await page.getByRole("link", { name: "Give feedback", exact: true }).getAttribute("href");
  expect(link).toMatch(/^feedback\/index.html\?demo=D1-letter-train&version=[a-f0-9]{40}$/);
  await page.getByRole("link", { name: "Give feedback", exact: true }).click();
  await expect(page).toHaveURL(/feedback\/index.html\?demo=D1-letter-train&version=[a-f0-9]{40}/);
  await expect(page.getByRole("heading", { name: "Middlebury campus RPG", exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test("a rejected save remains unchanged while a new in-memory trip can finish", async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, '{"version":999,"notes":["keep me"]}'), saveKey);
  await page.goto("/");
  await expect(page.getByRole("alert")).toContainText("kept unchanged");
  await page.getByLabel("Your character is traveling from").fill("New origin");
  await page.getByRole("button", { name: "Board the train", exact: true }).click();
  await finishRide(page);
  await expect(page.getByRole("heading", { name: "Welcome to Middlebury", exact: true })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), saveKey)).toBe('{"version":999,"notes":["keep me"]}');
});

test("blocked storage still permits the complete arrival without a crash", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage blocked"); } }));
  await page.goto("/");
  await expect(page.getByRole("alert")).toContainText("couldn’t save");
  await page.getByLabel("Your character is traveling from").fill("A".repeat(80));
  await page.getByRole("button", { name: "Board the train", exact: true }).click();
  await expect(page.getByRole("heading", { name: "On the way to Vermont", exact: true })).toBeVisible();
  await finishRide(page);
  await expect(page.getByRole("heading", { name: "Welcome to Middlebury", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("link", { name: "Give feedback", exact: true }).click();
  await expect(page.locator("#question-title")).toBeVisible();
});

async function finishRide(page: import("@playwright/test").Page) {
  for (const [scene, action] of [["departure", "Watch the countryside"], ["vermont", "Approach Middlebury"], ["approach", "Step onto the platform"]]) {
    await expect(page.locator(".train-window")).toHaveAttribute("data-scene", scene);
    await page.getByRole("button", { name: action, exact: true }).click();
  }
  await expect(page.getByText("You’ve reached the end of D1.")).toBeVisible();
  await expect(page.getByText(/Meeting them and creating your character come next/)).toBeVisible();
}

test("replay and an old train save preserve progress, and reduced motion stays still", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByLabel("Your character is traveling from").fill("Imagined home");
  await expect(page.locator("#origin-help")).toContainText("Real or imagined");
  await page.getByRole("button", { name: "Board the train" }).click();
  expect(await page.locator(".moving-scenery").evaluate(n => getComputedStyle(n).animationName)).toBe("none");
  await page.getByRole("button", { name: "Watch the countryside" }).click();
  await page.reload();
  await expect(page.locator(".train-window")).toHaveAttribute("data-scene", "vermont");
  await page.getByRole("button", { name: "Approach Middlebury" }).click();
  await page.getByRole("button", { name: "Step onto the platform" }).click();
  await page.evaluate(key => { const s=JSON.parse(localStorage.getItem(key)!);s.notes=[{id:"keep",text:"My note"}];delete s.arrival.beat;localStorage.setItem(key,JSON.stringify(s)); }, saveKey);
  await page.reload();
  await page.getByRole("button", { name: "Replay the arrival" }).click();
  await page.getByRole("button", { name: "Board the train" }).click();
  await finishRide(page);
  expect(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).notes,saveKey)).toEqual([{id:"keep",text:"My note"}]);
});
