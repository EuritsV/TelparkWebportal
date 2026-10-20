import { Locator, Page } from '@playwright/test';

export class Vehicle {
  public page: Page;
  public menuLink: Locator;
  public newVehicleLink: Locator;
  public name: Locator;
  public registration: Locator;
  public country: Locator;
  public saveLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuLink = page.getByRole('link', { name: /Veículos|Vehicles/i });
    this.newVehicleLink = page.getByRole('link', { name: /Novo Veículo|New Vehicle/i });
    this.name = page.getByRole('textbox', { name: /Nome|Name/i });
    this.registration = page.getByRole('textbox', { name: /Matrícula|Registration|Plate/i });
    this.country = page.getByRole('combobox');
    this.saveLink = page.getByRole('link', { name: /Guardar|Save/i });
  }

  async open() {
    await this.menuLink.click();
  }

  async create(name: string, registration: string) {
    await this.newVehicleLink.click();
    await this.name.fill(name);
    await this.registration.fill(registration);
    // The current portal lists “Other” as the first country option (value 0).
    await this.country.selectOption('0');
    await this.saveLink.click();
  }

  vehicleCard(registration: string): Locator {
    return this.page.locator('#vehicles').getByText(registration).locator('..').locator('..');
  }

  async remove(registration: string) {
    const card = this.vehicleCard(registration);
    await card.getByRole('link', { name: /Editar|Edit/i }).click();
    // In edit mode, the blank link in the vehicle card is the × remove control.
    await card.getByRole('link').filter({ hasText: /^$/ }).click();
    await this.page.getByRole('heading', { name: /Remover veículo|Remove vehicle/i }).waitFor();
    await this.page.getByRole('link', { name: /Remover|Remove/i }).click();
  }
}
