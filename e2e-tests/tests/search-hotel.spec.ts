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

test("should show hotel details", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Test city");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Test Hotel").first()).toBeVisible();
  await page.getByText("Test Hotel").first().click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Test city");

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Check-out  Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Test Hotel").first()).toBeVisible();
  await page.getByText("Test Hotel").first().click();
  await page.getByRole("button", { name: "Book Now" }).click();

  await expect(page.getByText("Total Cost: ₹6000.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4000003560000008");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("1234");
  await stripeFrame.locator('[placeholder="CVC"]').fill("567");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await page.waitForTimeout(10000);

  const confirmationFrame = page.frameLocator("#challengeFrame");
  await confirmationFrame.getByRole("button", {name: "Complete"}).click();

  await expect(page.getByText("Booking Confirmed!")).toBeVisible();

  await page.getByRole("link", {name: "My Bookings"}).click();
  await expect(page.getByText("Test Hotel").first()).toBeVisible();
});
