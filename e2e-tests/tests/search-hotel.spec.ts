import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("5@5.com");
  await page.locator("[name=password]").fill("qwerty");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign In Successful!")).toBeVisible();
});

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Test city");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels found in Test city")).toBeVisible();
  await expect(page.getByText("Test Hotel").first()).toBeVisible();
});

test("should show hotel details", async ({page}) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Test city");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Test Hotel").first()).toBeVisible();
  await page.getByText("Test Hotel").first().click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", {name: "Book Now"})).toBeVisible();

})