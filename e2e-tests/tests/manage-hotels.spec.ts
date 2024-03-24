import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // click the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  // check for correct page
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // input deatils
  await page.locator("[name=email]").fill("5@5.com");
  await page.locator("[name=password]").fill("qwerty");

  // click on login button
  await page.getByRole("button", { name: "Login" }).click();

  // check for correct data
  await expect(page.getByText("Sign In Successful!")).toBeVisible();
});

test("should allow users to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test city");
  await page.locator('[name="country"]').fill("Test country");
  await page
    .locator('[name="description"]')
    .fill(
      "Test description Test description Test description Test description"
    );
  await page.locator('[name="pricePerNight"]').fill("2000");
  await page.selectOption('select[name="starRating"]', "4");

  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Laundry").check();

  await page.locator('[name="adultCount"]').fill("5");
  await page.locator('[name="childCount"]').fill("3");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "hotel1.webp"),
    path.join(__dirname, "files", "hotel2.webp"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Test Hotel 1")).toBeVisible();
  await expect(page.getByText("sdcsdc")).toBeVisible();
  await expect(page.getByText("ajdnc, ksdc")).toBeVisible();
  await expect(page.getByText("Hiking Resort")).toBeVisible();
  await expect(page.getByText("₹600 per night")).toBeVisible();
  await expect(page.getByText("5 adults, 5 children")).toBeVisible();
  await expect(page.getByText("4 rating")).toBeVisible();

  await expect(page.getByRole("link", {name: "View Details"})).toBeVisible();
  await expect(page.getByRole("link", {name: "Add Hotel"})).toBeVisible();
});
