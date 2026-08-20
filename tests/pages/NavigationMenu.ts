import { expect, Page } from '@playwright/test';

export class NavigationMenu {
  readonly logoutLink;
  constructor(private readonly page: Page) {
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }
  async expectOpen(): Promise<void> { await expect(this.logoutLink).toBeVisible(); }
  async logout(): Promise<void> { await this.logoutLink.click(); }
}
