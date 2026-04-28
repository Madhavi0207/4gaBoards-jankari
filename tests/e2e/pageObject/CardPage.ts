import { Locator, Page, expect } from 'playwright/test';
import { DataTable } from '@cucumber/cucumber';

export class CardPage {
  private readonly page: Page;
  private readonly boardUrl: string;

  private readonly addCardBtnSelector: Locator;
  private readonly fillCardNameArea: Locator;
  private readonly addCardButton: Locator;
  private readonly visibleCardName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.boardUrl = 'http://localhost:3000/boards/1763185449104311303';

    this.addCardBtnSelector = this.page.getByRole('button', { name: 'Add Card' }).and(this.page.locator('button[type=button]')).nth(8);

    this.addCardButton = this.page.getByRole('button', { name: 'Add Card' }).nth(6);
    this.visibleCardName = this.page.locator('.List_cards__soDK7').nth(8);
    this.fillCardNameArea = this.visibleCardName.locator('textarea');
  }

  public async navigateToBoardPage(): Promise<void> {
    await this.page.goto(`${this.boardUrl}`);
  }

  public async addCardFunction(dataTable: DataTable): Promise<void> {
    const data = dataTable.hashes();

    await this.addCardBtnSelector.click();
    // await this.page.locator('.List_cards__soDK7').nth(8).locator('textarea').focus();
    // await this.page.keyboard.type('My card name');
    await this.page.keyboard.type(data[0].cardName);
    await this.addCardButton.click();
  }

  public async isAddedCardVisible(): Promise<void> {
    await expect(this.visibleCardName).toBeVisible();
  }
}
