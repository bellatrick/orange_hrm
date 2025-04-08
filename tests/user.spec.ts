import test, { expect } from '@playwright/test';
import { login } from '../helpers';

test('create new user', async ({ page }) => {
  const username = 'Busayo12';
  await login(page, 'Admin', 'admin123');

  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers'
  );

  await page.locator("//button[normalize-space()='Add']").click();

  await page
    .locator("(//div[@class='oxd-select-text oxd-select-text--active'])[1]")
    .click();
  await page.getByRole('option', { name: 'Admin' }).click();

  await page
    .locator("(//div[@class='oxd-select-text oxd-select-text--active'])[2]")
    .click();
  await page.getByRole('option', { name: 'Enabled' }).click();

  // First, fill the input field
  await page.locator("//input[@placeholder='Type for hints...']").fill('a');
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('a');

  // Wait for the "Searching..." indicator to appear
  await page
    .getByRole('option', { name: 'Searching....' })
    .waitFor({ state: 'visible' });

  // Wait for the "Searching..." indicator to disappear
  await page
    .getByRole('option', { name: 'Searching....' })
    .waitFor({ state: 'hidden' });

  await page
    .locator("(//div[contains(@class, 'oxd-autocomplete-option')])[1]")
    .click();

  await page
    .locator("(//input[contains(@class, 'oxd-input--active')])[2]")
    .fill(username);
  const passwordField1 = page.locator(
    "(//input[contains(@type,'password')])[1]"
  );
  const passwordField2 = page.locator(
    "(//input[contains(@type,'password')])[2]"
  );
  await expect(passwordField1).toBeVisible();
  await passwordField1.fill('Admin123');

  await expect(passwordField2).toBeVisible();
  await passwordField2.fill('Admin123');

  await page.getByRole('button', { name: 'Save' }).click();

  await page
    .locator("//h5[normalize-space()='System Users']")
    .waitFor({ state: 'visible' });

  const input = page.locator(
    "(//input[@class='oxd-input oxd-input--active'])[2]"
  );
  await input.fill(username);
  page.getByRole('button', { name: 'Search' }).click();

  // check that user exists in the results
  const rowGroup = page.getByRole('row').nth(1);
  await expect(rowGroup).toContainText(username);

  //clean up test by deleting users
  await page.locator("//i[@class='oxd-icon bi-trash']").click();
  await page.getByRole('button', { name: 'Yes, Delete' }).click();
});
