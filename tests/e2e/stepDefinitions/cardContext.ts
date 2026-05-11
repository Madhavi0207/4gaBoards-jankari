import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/CustomWorld';
import { CardPage } from '../pageObject/CardPage';
import { LoginPage } from '../pageObject/LoginPage';

Given('the admin user has logged in with the following credentials:', async function (this: CustomWorld, dataTable: DataTable) {
  this.loginPage = new LoginPage(this.page);

  await this.loginPage.navigateToLoginPage();
  await this.loginPage.login(dataTable);
  await expect(this.page).toHaveURL(this.loginPage.baseUrl);
  await expect(this.loginPage.dashboardSelector).toBeVisible();
});

Given('the user has navigated to the boards page', async function (this: CustomWorld) {
  if (!this.cardPage) {
    this.cardPage = new CardPage(this.page);
  }
  await this.cardPage.navigateToBoardPage();
});

When('the user edits the card with following details:', async function (this: CustomWorld, dataTable: DataTable) {
  if (!this.cardPage) {
    this.cardPage = new CardPage(this.page);
  }
  await this.cardPage.isCardVisible();
  await this.cardPage.addMembersToCard();

  const rows = dataTable.hashes();

  for (const row of rows) {
    await this.cardPage.editDescriptionBox(row.description);
    await this.cardPage.addTaskforAll(row.task);
  }
  await this.cardPage.addCommentForAll();
});
Then('the card should be updated with the new details', async function (this: CustomWorld) {
  if (!this.cardPage) {
    this.cardPage = new CardPage(this.page);
  }

  await expect(this.cardPage.assertCard).toBeVisible();
  await expect(this.cardPage.descriptionText).toBeVisible();
});
