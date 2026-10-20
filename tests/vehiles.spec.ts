import { test, expect } from '@playwright/test';
import { Login } from '../pages/login';
import { Vehicle } from '../pages/vehicle';
import { vehicleData } from './vehicle.data';

test.describe('Vehicle management', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async ({ page }) => {
    const login = new Login(page);
    await login.goto();
    await login.loginForm(process.env.VALID_EMAIL || '', process.env.VALID_PASSWORD || '');
    await login.cookieHandler();
    await expect(login.passParkingActive).toBeVisible();
  });

  test('creates a vehicle for country Other', async ({ page }) => {
    const vehicle = new Vehicle(page);
    await vehicle.open();
    await expect(page.getByRole('heading', { level: 2 }).or(page.getByRole('heading'))).toContainText(/Veículos|Vehicles/);
    await vehicle.create(vehicleData.name, vehicleData.registration);
    await expect(vehicle.vehicleCard(vehicleData.registration)).toBeVisible();
  });

  test('removes the created vehicle', async ({ page }) => {
    const vehicle = new Vehicle(page);
    await vehicle.open();
    const card = vehicle.vehicleCard(vehicleData.registration);
    await expect(card).toBeVisible();
    await vehicle.remove(vehicleData.registration);
    await expect(card).toHaveCount(0);
  });
});
