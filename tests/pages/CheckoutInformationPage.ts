import { expect, Page } from '@playwright/test';

export class CheckoutInformationPage {
  readonly firstName;
  readonly lastName;
  readonly postalCode;
  readonly continueButton;

  constructor(private readonly page: Page) {
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postalCode = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }
  async expectLoaded(): Promise<void> {
    await expect(this.page.getByText('Checkout: Your Information', { exact: true })).toBeVisible();
  }
  async continueEmpty(): Promise<void> { await this.continueButton.click(); }
  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }
  async continue(): Promise<void> { await this.continueButton.click(); }
}
