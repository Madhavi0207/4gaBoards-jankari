import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { DataTable } from '@cucumber/cucumber';
import { CustomWorld } from '../support/CustomWorld';
import { ListPage } from '../pageObject/ListPage';
import { LoginPage } from '../pageObject/LoginPage';

Given('the admin user has logged in to the dashboard', async function (this: CustomWorld, dataTable: DataTable) {
  this.loginPage = new LoginPage(this.page);

  await this.loginPage.navigateToLoginPage();
  await this.loginPage.login(dataTable);
  await expect(this.page).toHaveURL(this.loginPage.baseUrl);
  await expect(this.page.locator("div[title='Dashboard']")).toBeVisible();
});
Given('the user has navigated to the board page', async function (this: CustomWorld) {
  this.listPage = new ListPage(this.page);

  await this.listPage.navigateToBoardPage();
  await expect(this.page).toHaveURL(`${this.listPage.boardUrl}`);
});

When('the user clicks on Add Board button and enters following credentials', async function (this: CustomWorld, dataTable: DataTable) {
  if (!this.listPage) {
    this.listPage = new ListPage(this.page);
  }

  await this.listPage.createList(dataTable);
});

Then('then the list should appear in the board page', async function (this: CustomWorld) {
  if (!this.listPage) {
    this.listPage = new ListPage(this.page);
  }

  await this.listPage.isCardVisible();
});
