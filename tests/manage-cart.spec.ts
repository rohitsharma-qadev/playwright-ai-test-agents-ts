import { expect, test } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { InventoryPage } from './pages/InventoryPage';
import { LoginPage } from './pages/LoginPage';

test.describe('Core E-commerce User Operations', () => {
  test('Add and manage items in the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // 1. Sign in with an empty cart.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
    await inventoryPage.expectCartCount(0);

    // 2. Add the backpack and bike light.
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.addProduct('Sauce Labs Bike Light');
    await inventoryPage.expectCartCount(2);
    await expect(page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Backpack' }).getByRole('button', { name: 'Remove' })).toBeVisible();
    await expect(page.locator('[data-test="inventory-item"]').filter({ hasText: 'Sauce Labs Bike Light' }).getByRole('button', { name: 'Remove' })).toBeVisible();

    // 3. Open the cart and verify both products.
    await inventoryPage.openCart();
    await cartPage.expectItemCount(2);
    await cartPage.expectItem('Sauce Labs Backpack', '$29.99');
    await cartPage.expectItem('Sauce Labs Bike Light', '$9.99');
    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();

    // 4. Continue shopping and remove the backpack.
    await cartPage.continueShopping();
    await inventoryPage.removeProduct('Sauce Labs Backpack');
    await inventoryPage.expectCartCount(1);

    // 5. Reopen the cart and begin checkout with the remaining item.
    await inventoryPage.openCart();
    await cartPage.expectItemCount(1);
    await cartPage.expectItem('Sauce Labs Bike Light', '$9.99');
    await cartPage.checkout();
    await expect(page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();
  });
});
