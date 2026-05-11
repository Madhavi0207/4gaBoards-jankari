import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/CustomWorld';
import { LoginPage } from '../pageObject/LoginPage';
import { DeleteCardPage } from '../pageObject/DeleteCardPage';

Given('the admin user has logged in with the following credentials:', async function (this: CustomWorld, dataTable: DataTable) {
  this.loginPage = new LoginPage(this.page);

  await this.loginPage.navigateToLoginPage();
  await this.loginPage.login(dataTable);
  await expect(this.page).toHaveURL(this.loginPage.baseUrl);
  await expect(this.loginPage.dashboardSelector).toBeVisible();
});

Given('the user is already in the card page', async function (this: CustomWorld) {
  this.deleteCardPage = new DeleteCardPage(this.page);
  await this.deleteCardPage.navigateToCardPage();
});

When('the user deletes the card', async function (this: CustomWorld) {
  this.deleteCardPage = new DeleteCardPage(this.page);
  await this.deleteCardPage.deleteCardFunction();
});

Then('the card must be removed from the list', async function (this: CustomWorld) {
  this.deleteCardPage = new DeleteCardPage(this.page);
  await this.deleteCardPage.isDeleted();
});
