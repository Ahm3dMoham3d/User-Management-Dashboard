import { test, expect } from "@playwright/test";

test.describe("User Management Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should log in successfully as admin", async ({ page }) => {
    await page.fill("#email", "admin@example.com");
    await page.fill("#password", "password");
    await page.click("#login-button");

    await expect(page).toHaveURL(/dashboard/);

    await expect(page.locator(".avatar")).toHaveText("Admin User");
  });

  test("should log in successfully as manager", async ({ page }) => {
    await page.fill("#email", "manager@example.com");
    await page.fill("#password", "password");
    await page.click("#login-button");

    await expect(page).toHaveURL(/dashboard/);

    await expect(page.locator(".avatar")).toHaveText("Manager User");
  });

  test("should log in successfully as viewer", async ({ page }) => {
    await page.fill("#email", "viewer@example.com");
    await page.fill("#password", "password");
    await page.click("#login-button");

    await expect(page).toHaveURL(/dashboard/);

    await expect(page.locator(".avatar")).toHaveText("Viewer User");
  });
});
