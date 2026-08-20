import { expect, test } from '@playwright/test';
import { InventoryPage } from './pages/InventoryPage';
import { LoginPage } from './pages/LoginPage';

test.describe('Core E-commerce User Operations', () => {
  test('Sign in with valid and invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // 1. Open the SauceDemo login page.
    await loginPage.goto();
    await loginPage.expectLoaded();

    // 2. Submit the login form with both fields empty.
    await loginPage.submitEmpty();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemoo.com/');

    // 3. Try the locked-out account.
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // 4. Sign in with valid credentials.
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
    await inventoryPage.expectLoaded();
  });
});
