import { Locator, Page } from '@playwright/test';
import { DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

export class ListPage {
  private readonly page: Page;

  public readonly boardUrl: String;

  public readonly addListSelector: Locator;
  // private readonly cancelBtnSelector: Locator;
  private readonly addListBtnSelector: Locator;
  private readonly fillListName: Locator;
  private readonly projectNameSelector: Locator;

  constructor(page: Page) {
    this.page = page;

    this.boardUrl = 'http://localhost:3000/boards/1763185449104311303';

    this.addListSelector = this.page.getByRole('button', { name: 'Add list' });
    // this.cancelBtnSelector = this.page.getByRole('button', { name: 'Cancel' });
    this.addListBtnSelector = this.page.locator('button[type="submit"]', { hasText: 'Add list' });

    this.fillListName = this.page.getByRole('textbox', { name: 'Enter list name...' });
    this.projectNameSelector = this.page.locator('.List_outerWrapper__B4Idr', { has: this.page.getByText('Madhavi') });
  }

  public async navigateToBoardPage(): Promise<void> {
    await this.page.goto(`${this.boardUrl}`);
  }

  public async createList(dataTable: DataTable): Promise<void> {
    const data = dataTable.hashes();
    await this.addListSelector.click();
    await this.fillListName.fill(data[0].name);

    await Promise.all([this.page.waitForLoadState('networkidle'), this.addListBtnSelector.click()]);
    // await Promise.all([this.page.waitForLoadState('networkidle'), this.cancelBtnSelector.click()]);
  }

  public async isCardVisible(): Promise<void> {
    await expect(this.projectNameSelector).toBeVisible();
  }
}
