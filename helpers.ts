export async function login(page, username, password) {
  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  );
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { text: 'Login' }).click();
}

// function to delete user

export async function deleteUser(page, username) {
  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers'
  );
  await page.locator('text=' + username).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
}