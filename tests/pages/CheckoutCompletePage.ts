import { expect, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly backHomeButton;
  readonly pdfButton;
  constructor(private readonly page: Page) {
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    this.pdfButton = page.getByRole('button', { name: 'Generate PDF order' });
  }
  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Checkout: Complete!', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
    await expect(this.page.getByText(/Your order has been dispatched/)).toBeVisible();
    await expect(this.backHomeButton).toBeVisible();
    await expect(this.pdfButton).toBeVisible();
  }
  async backHome(): Promise<void> { await this.backHomeButton.click(); }
}
