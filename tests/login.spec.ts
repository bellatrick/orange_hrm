import test, { expect } from '@playwright/test';
import { login } from '../helpers';
// create a function to test different login scenarios

// test that login is successful
test('login successful', async ({ page }) => {
  await login(page, 'Admin', 'admin123');
  await expect(page).toHaveURL(
    'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index'
  );
});

//test with wrong login

test('login failed', async ({ page }) => {
  await login(page, 'Admin', 'admin1234');
  await expect(page).toHaveURL(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  );
});

//test that login error message shows up

test('login error message', async ({ page }) => {
  await login(page, 'Admin', 'admin1234');
  await expect(page.getByText('Invalid credentials')).toBeVisible();
});
