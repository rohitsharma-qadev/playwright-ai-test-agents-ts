import { expect, Page } from '@playwright/test';

export class InventoryPage {
  readonly productsHeading;
  readonly sortSelect;
  readonly cartLink;
  readonly menuButton;

  constructor(private readonly page: Page) {
    this.productsHeading = page.getByText('Products', { exact: true });
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
  }

  async goto(): Promise<void> { await this.page.goto('https://www.saucedemo.com/inventory.html'); }
  async expectLoaded(): Promise<void> {
    await expect(this.productsHeading).toBeVisible();
    await expect(this.page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  }
  productNames() { return this.page.locator('[data-test="inventory-item-name"]'); }
  async addProduct(name: string): Promise<void> {
    const item = this.page.locator('[data-test="inventory-item"]').filter({ hasText: name });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }
  async removeProduct(name: string): Promise<void> {
    const item = this.page.locator('[data-test="inventory-item"]').filter({ hasText: name });
    await item.getByRole('button', { name: 'Remove' }).click();
  }
  async sortBy(label: string): Promise<void> { await this.sortSelect.selectOption({ label }); }
  async openProduct(name: string): Promise<void> {
    const item = this.page.locator('[data-test="inventory-item"]').filter({ hasText: name });
    await item.locator('[data-test$="-title-link"]').click();
  }
  async openCart(): Promise<void> { await this.cartLink.click(); }
  async openMenu(): Promise<void> { await this.menuButton.click(); }
  async expectCartCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartLink).not.toContainText(/\d/);
    } else {
      await expect(this.cartLink).toContainText(String(count));
    }
  }
}
