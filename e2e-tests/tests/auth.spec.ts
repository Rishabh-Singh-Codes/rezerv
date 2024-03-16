import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // click the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  // check for correct page
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // input deatils
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("qwerty");

  // click on login button
  await page.getByRole("button", { name: "Login" }).click();

  // check for correct data
  await expect(page.getByText("Sign In Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 9000 + 1000)}@test.com`
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_fName1");
  await page.locator("[name=lastName]").fill("test_lName1");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("qwerty");
  await page.locator("[name=confirmPassword]").fill("qwerty");

  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByText("Registration Successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
});
