import { expect, Locator, Page } from '@playwright/test';

export class DeleteCardPage {
  private readonly page: Page;

  private readonly boardsButtonSelector: Locator;
  private readonly cardSelector: Locator;
  private readonly deleteCard: Locator;
  private readonly assertCard: Locator;
  private readonly deleteBtn: Locator;
  private readonly cardCounter: Locator;

  constructor(page: Page) {
    this.page = page;

    this.boardsButtonSelector = this.page.getByRole('button', { name: 'Learn 4ga Boards' });
    this.cardSelector = this.page.getByTitle('GitHub');
    this.deleteCard = this.page.getByRole('button', { name: 'Delete Card' });
    this.assertCard = this.page.getByText('Are you sure you want to delete this card?');
    const delete_button = this.page.locator('.global_controlsCenter__QXTq6');
    this.deleteBtn = delete_button.getByRole('button', { name: 'Delete card' });
    this.cardCounter = this.page.getByText('1 cards');
  }
  public async navigateToCardPage(): Promise<void> {
    await this.boardsButtonSelector.click();
  }
  public async deleteCardFunction(): Promise<void> {
    await this.cardSelector.click();
    await this.deleteCard.click();
    await expect(this.assertCard).toBeVisible();
    await this.deleteBtn.click();
  }
  public async isDeleted(): Promise<void> {
    await expect(this.cardCounter).toBeVisible();
  }
}
