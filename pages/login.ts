import { Locator, Page } from "@playwright/test";

export class Login {
  public page: Page;
  public email: Locator;
  public password: Locator;
  public LogInButton: Locator;
  public cookieReject: Locator;
  public passParkingActive: Locator;
  public errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.LogInButton = page.getByRole('button', { name: "Log In" });
    this.cookieReject = page.locator('#onetrust-reject-all-handler');
    this.passParkingActive = page.locator('.pass_parking.active');
    this.errorMessage = page.locator('.kc-feedback-text');
  }

  async goto() {
    await this.page.goto('/');
  }

  async loginForm(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.LogInButton.click();
  }

  async cookieHandler() {
    try {
      await this.cookieReject.waitFor({ state: 'visible', timeout: 5000 });
      await this.cookieReject.click();
    } catch {
      // Cookie banner may not be visible or was already closed
    }
  }
}