import { test, expect } from '@playwright/test';
import { Login } from '../pages/login';

test.describe("Login functionality", () => {
  let login: Login;

  const validEmail = process.env.VALID_EMAIL || '';
  const validPassword = process.env.VALID_PASSWORD || '';
  const invalidEmail = process.env.INVALID_EMAIL || process.env.VALID_EMAIL || '';
  const invalidPassword = process.env.INVALID_PASSWORD || '';

  test.beforeEach(async ({ page }) => {
    login = new Login(page);
    await login.goto();
  });

  test('User should login Successful', async ({ page }) => {
    await expect(page).toHaveTitle(/Telpark/);

    await login.loginForm(validEmail, validPassword);
    await login.cookieHandler();
    await expect(login.passParkingActive).toBeVisible();
  });

  test('User should not login with wrong credentials', async ({ page }) => {
    await expect(page).toHaveTitle(/Telpark/);

    await login.loginForm(invalidEmail, invalidPassword);
    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toHaveText("Invalid username or password.");
  });
});
