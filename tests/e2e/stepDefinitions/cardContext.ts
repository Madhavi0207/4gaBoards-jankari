import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/CustomWorld';
import { CardPage } from '../pageObject/CardPage';
import { LoginPage } from '../pageObject/LoginPage';

Given('the admin user is already loggedin with following credentials', async function (this: CustomWorld, dataTable: DataTable) {
  this.loginPage = new LoginPage(this.page);

  await this.loginPage.navigateToLoginPage();
  await this.loginPage.login(dataTable);
  await expect(this.page).toHaveURL(this.loginPage.baseUrl);
  await expect(this.page.locator("div[title='Dashboard']")).toBeVisible();
});

Given('the user is in the boards page', async function (this: CustomWorld) {
  this.cardPage = new CardPage(this.page);
  await this.cardPage.navigateToBoardPage();
});

When('the user trys to add details to the card', async function (this: CustomWorld) {
  if (!this.cardPage) {
    this.cardPage = new CardPage(this.page);
  }
  await this.cardPage.isCardVisible();
  await this.cardPage.addMembersFunction();
  await this.cardPage.editDescriptionBox();
  await this.cardPage.addTaskforAll();
  await this.cardPage.addCommentForAll();
});
Then('the user must be able to add details to the card', async function (this: CustomWorld) {
  if (!this.cardPage) {
    this.cardPage = new CardPage(this.page);
  }
  await this.cardPage.isCardDetailsAdded();
});
