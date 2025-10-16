import { expect, test } from "@playwright/test";

const ROOT_URL = "http://localhost:5173/react-todo-app/";

test("has title", async ({ page }) => {
  await page.goto(ROOT_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("React Todo list app");
});

test("test setting item as completed", async ({ page }) => {
  await page.goto(ROOT_URL);
  await expect(page.getByText("Kaukolė×️")).toBeVisible();
  await page.getByTestId("todo-item-0").getByRole("checkbox").check();
  await expect(page.getByTestId("todo-item-0")).toHaveClass(/completed/);
  await expect(page.getByText("Kaukolė×️")).toBeVisible();
});
