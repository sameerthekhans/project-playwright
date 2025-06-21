import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/React • TodoMVC/);
});

test('has todos heading', async ({ page }) => {
  await expect(page.getByRole('heading', {level: 1})).toHaveText(/todos/);
});

test('save todo', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?')
  await todoInput.fill('Sample Todo')
  await todoInput.press('Enter');

  const firstItem = page.getByTestId('todo-item').first()

  await expect(firstItem).toHaveText(/Sample Todo/);
});

test('delete todo', async ({ page }) => {
  const todoInput = page.getByPlaceholder('What needs to be done?')
  await todoInput.fill('Sample Todo')
  await todoInput.press('Enter');

  const firstItem = page.getByTestId('todo-item').first()

  await expect(firstItem).toHaveText(/Sample Todo/);

  // await firstItem.hover()
  await firstItem.getByLabel('Delete').click()
  await expect(firstItem).toHaveCount(0)
});