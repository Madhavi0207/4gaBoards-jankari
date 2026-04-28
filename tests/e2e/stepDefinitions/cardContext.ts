import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from 'playwright/test';
import { CustomWorld } from '../support/CustomWorld';
import { CardPage } from '../pageObject/CardPage';
import { LoginPage } from '../pageObject/LoginPage';
import { ListPage } from '../pageObject/ListPage';

//login and add list
Given('the admin user has navigated to the login page', async function (this: CustomWorld, dataTable: DataTable) {
  this.loginPage = new LoginPage(this.page);

  await this.loginPage.navigateToLoginPage();
  await this.loginPage.login(dataTable);

  await expect(this.page).toHaveURL(this.loginPage.baseUrl);
  await expect(this.page.locator("div[title='Dashboard']")).toBeVisible();
});

Given('the admin user has navigated to the board page', async function (this: CustomWorld) {
  this.listPage = new ListPage(this.page);

  await this.listPage.navigateToBoardPage();
});

Given('the user trys to add board and enters following credentials', async function (this: CustomWorld, dataTable: DataTable) {
  this.listPage = new ListPage(this.page);
  await this.listPage.createList(dataTable);

  await this.listPage.isCardVisible();
});

//Add Card

Given('the user is in the boards section', async function (this: CustomWorld) {
  this.cardPage = new CardPage(this.page);

  await this.cardPage.navigateToBoardPage();
});

When('the user clicks the add card button and enters following credentials', async function (this: CustomWorld, dataTable: DataTable) {
  if (!this.cardPage) {
    this.cardPage = new CardPage(this.page);
  }

  await this.cardPage.addCardFunction(dataTable);
});

Then('the card shall be added successfully', async function (this: CustomWorld) {
  if (!this.cardPage) {
    this.cardPage = new CardPage(this.page);
  }
  await this.cardPage.isAddedCardVisible();
});
