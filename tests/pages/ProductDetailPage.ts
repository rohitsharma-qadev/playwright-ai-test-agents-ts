import { expect, Page } from '@playwright/test';

export class ProductDetailPage {
  readonly backButton;
  readonly addButton;

  constructor(private readonly page: Page) {
    this.backButton = page.getByRole('button', { name: /Back to products/i });
    this.addButton = page.getByRole('button', { name: 'Add to cart' });
  }
  async expectProduct(name: string, price: string): Promise<void> {
    await expect(this.page.getByText(name, { exact: true })).toBeVisible();
    await expect(this.page.getByText(price, { exact: true })).toBeVisible();
    await expect(this.addButton).toBeVisible();
  }
  async addToCart(): Promise<void> { await this.addButton.click(); }
  async backToProducts(): Promise<void> { await this.backButton.click(); }
}
