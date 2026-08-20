import { expect, Page } from '@playwright/test';

export class CartPage {
  readonly continueShoppingButton;
  readonly checkoutButton;

  constructor(private readonly page: Page) {
    this.continueShoppingButton = page.getByRole('button', { name: /Continue Shopping/i });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }
  item(name: string) { return this.page.locator('[data-test="inventory-item"]').filter({ hasText: name }); }
  async expectItem(name: string, price: string): Promise<void> {
    const item = this.item(name);
    await expect(item).toBeVisible();
    await expect(item).toContainText(price);
  }
  async expectItemCount(count: number): Promise<void> {
    await expect(this.page.locator('[data-test="inventory-item"]')).toHaveCount(count);
  }
  async continueShopping(): Promise<void> { await this.continueShoppingButton.click(); }
  async checkout(): Promise<void> { await this.checkoutButton.click(); }
}
