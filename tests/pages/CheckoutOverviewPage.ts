import { expect, Page } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly finishButton;
  constructor(private readonly page: Page) {
    this.finishButton = page.getByRole('button', { name: 'Finish' });
  }
  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Checkout: Overview', { exact: true })).toBeVisible();
    await expect(this.page.getByText('SauceCard #31337', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Free Pony Express Delivery!', { exact: true })).toBeVisible();
    await expect(this.page.getByText(/Item total:/)).toBeVisible();
    await expect(this.page.getByText(/Tax:/)).toBeVisible();
    await expect(this.page.getByText(/Total:/)).toBeVisible();
  }
  async finish(): Promise<void> { await this.finishButton.click(); }
}
