import { expect, test } from '@playwright/test';
import { CartPage } from './pages/CartPage';
import { CheckoutCompletePage } from './pages/CheckoutCompletePage';
import { CheckoutInformationPage } from './pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from './pages/CheckoutOverviewPage';
import { InventoryPage } from './pages/InventoryPage';
import { LoginPage } from './pages/LoginPage';

test.describe('Core E-commerce User Operations', () => {
  test('Complete checkout and verify the order', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const informationPage = new CheckoutInformationPage(page);
    const overviewPage = new CheckoutOverviewPage(page);
    const completePage = new CheckoutCompletePage(page);

    // 1. Sign in, add the backpack, and open checkout.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();
    await informationPage.expectLoaded();

    // 2. Submit the checkout form without customer information.
    await informationPage.continueEmpty();
    await expect(page.getByText('Error: First Name is required')).toBeVisible();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    // 3. Enter valid customer information and review the order.
    await informationPage.fillInformation('Ada', 'Lovelace', '10101');
    await informationPage.continue();
    await overviewPage.expectLoaded();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

    // 4. Finish the order.
    await overviewPage.finish();
    await completePage.expectLoaded();

    // 5. Return home and verify the cart is cleared.
    await completePage.backHome();
    await inventoryPage.expectLoaded();
    await inventoryPage.expectCartCount(0);
  });
});