import { expect, test } from '@playwright/test';
import { InventoryPage } from './pages/InventoryPage';
import { LoginPage } from './pages/LoginPage';
import { NavigationMenu } from './pages/NavigationMenu';

test.describe('Core E-commerce User Operations', () => {
  test('Log out and verify session termination', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const navigationMenu = new NavigationMenu(page);

    // 1. Sign in with valid credentials.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();

    // 2. Open the navigation menu and log out.
    await inventoryPage.openMenu();
    await navigationMenu.expectOpen();
    await navigationMenu.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await loginPage.expectLoaded();

    // 3. Try to access the inventory page directly after logout.
    await inventoryPage.goto();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await loginPage.expectLoaded();
  });
});
