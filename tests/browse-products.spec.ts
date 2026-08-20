import { expect, test } from '@playwright/test';
import { InventoryPage } from './pages/InventoryPage';
import { LoginPage } from './pages/LoginPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

test.describe('Core E-commerce User Operations', () => {
  test('Browse, sort, and inspect a product', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);

    // 1. Sign in and open the inventory page.
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
    await expect(inventoryPage.productNames()).toHaveCount(6);

    // 2. Sort products from the lowest price to the highest price.
    await inventoryPage.sortBy('Price (low to high)');
    await expect(inventoryPage.productNames()).toHaveText([
      'Sauce Labs Onesie',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Backpack',
      'Sauce Labs Fleece Jacket',
    ]);

    // 3. Sort products in reverse alphabetical order.
    await inventoryPage.sortBy('Name (Z to A)');
    await expect(inventoryPage.productNames()).toHaveText([
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack',
    ]);

    // 4. Inspect the backpack details.
    await inventoryPage.openProduct('Sauce Labs Backpack');
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
    await productDetailPage.expectProduct('Sauce Labs Backpack', '$29.99');

    // 5. Return to the product list.
    await productDetailPage.backToProducts();
    await inventoryPage.expectLoaded();
  });
});
