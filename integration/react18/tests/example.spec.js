const { test, expect } = require('@playwright/test');

test.describe('example app', () => {
  test('loads', async ({ page }) => {
    await page.goto('/');
  });

  test('renders links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a#react_angular')).toContainText('react.angular');
    await expect(page.locator('a#angular_react')).toContainText('angular.react');
    await expect(page.locator('a[ui-sref=angular]')).toContainText('angular');
  });

  test('renders angularjs', async ({ page }) => {
    await page.goto('/');
    await page.click('#angular');
    await expect.poll(() => page.url()).toContain('#!/angular');
    await expect(page.locator('body')).toContainText('Hello from angularjs');
  });

  test('renders react', async ({ page }) => {
    await page.goto('/');
    await page.click('#react');
    await expect.poll(() => page.url()).toContain('#!/react');
    await expect(page.locator('body')).toContainText('Hello from react');
  });

  test('renders react inside angularjs', async ({ page }) => {
    await page.goto('/');
    await page.click('#angular_react');
    await expect.poll(() => page.url()).toContain('#!/angular/react');
    await expect(page.locator('body')).toContainText('Hello from angularjs');
    await expect(page.locator('body')).toContainText('Hello from react');
  });

  test('renders angularjs inside react', async ({ page }) => {
    await page.goto('/');
    await page.click('#react_angular');
    await expect.poll(() => page.url()).toContain('#!/react/angular');
    await expect(page.locator('body')).toContainText('Hello from react');
    await expect(page.locator('body')).toContainText('Hello from angularjs');
  });

  test('renders angularjs inside react inside angularjs', async ({ page }) => {
    await page.goto('/');
    await page.click('#angular_react_angular');
    await expect.poll(() => page.url()).toContain('#!/angular/react/angular');
  });

  test('renders react inside angularjs inside react', async ({ page }) => {
    await page.goto('/');
    await page.click('#react_angular_react');
    await expect.poll(() => page.url()).toContain('#!/react/angular/react');
  });

  test('renders react inside angularjs inside react inside angularjs', async ({ page }) => {
    await page.goto('/');
    await page.click('#angular_react_angular_react');
    await expect.poll(() => page.url()).toContain('#!/angular/react/angular/react');
  });

  test('renders angularjs inside react inside angularjs inside react', async ({ page }) => {
    await page.goto('/');
    await page.click('#react_angular_react_angular');
    await expect.poll(() => page.url()).toContain('#!/react/angular/react/angular');
  });

  test('renders angularjs components via componentProvider', async ({ page }) => {
    await page.goto('/');

    await page.click('#angularComponentProvider');
    await expect.poll(() => page.url()).toContain('#!/angularComponentProvider/angularComponent');
    await expect(page.locator('body')).toContainText('Hello from angularjs');

    await page.click('#angularComponentProvider2');
    await expect.poll(() => page.url()).toContain('#!/angularComponentProvider/angularComponent2');
    await expect(page.locator('body')).toContainText('Hello from second angularjs component');
  });

  test('renders arbitrary react components via a provider functional component', async ({ page }) => {
    await page.goto('/');

    await page.click('#reactComponentProvider');
    await expect.poll(() => page.url()).toContain('#!/reactComponentProvider/ReactComponent');
    await expect(page.locator('body')).toContainText('Hello from react class component');

    await page.click('#reactComponentProvider2');
    await expect.poll(() => page.url()).toContain('#!/reactComponentProvider/ReactFunctionalComponent');
    await expect(page.locator('body')).toContainText('Hello from react functional component');
  });
});
