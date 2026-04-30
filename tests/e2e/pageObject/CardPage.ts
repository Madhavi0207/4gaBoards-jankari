import { Locator, LocatorScreenshotOptions, Page, expect } from 'playwright/test';
import { DataTable } from '@cucumber/cucumber';

export class CardPage {
  private readonly page: Page;
  private readonly boardUrl: string;
  private readonly cardUrl: string;

  private readonly cardSelector: Locator;
  private readonly subscribeBtnSelector: Locator;

  private readonly addMemberBtnSelector: Locator;
  private readonly addMemberTextarea: Locator;
  private readonly selectMemberBtn: Locator;

  private readonly editDescriptionIcon: Locator;
  private readonly descriptionBox: Locator;
  private readonly saveDescirptionBtn: Locator;

  private readonly addTaskIcon: Locator;

  private readonly fillTaskArea: Locator;

  // private readonly addAttachmentIcon: Locator;

  private readonly addCommentIcon: Locator;
  // private readonly editingIconInsideTextbox: Locator;
  // private readonly wrapperClass: Locator;
  private readonly addCommentTextArea: Locator;
  private readonly saveComment: Locator;
  private readonly assertComment: Locator;

  private readonly crossIcon: Locator;
  private readonly assertionOfCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.boardUrl = 'http://localhost:3000/boards/1763185449104311303';

    this.cardSelector = this.page.locator('[title="Different language of Getting Started?"]');
    this.cardUrl = 'http://localhost:3000/cards/1763185449532130326';
    this.subscribeBtnSelector = this.page.getByText('Different language of Getting Started?').locator('xpath=ancestor::div[contains(@class,"CardModal_headerFirstLine")]');

    this.addMemberBtnSelector = this.page.getByTitle('Add Member');
    this.addMemberTextarea = this.page.locator('input[placeholder="Search members..."]');
    this.selectMemberBtn = this.page.locator('button', { hasText: 'Demo Demo' });

    this.editDescriptionIcon = this.page.getByTitle('Edit Description').nth(0);
    this.descriptionBox = this.page.locator('textarea[placeholder="Enter description..."]');
    this.saveDescirptionBtn = this.page.locator('button[type="submit"][title="Save"]');

    this.addTaskIcon = this.page.locator('button.Tasks_taskButton__eNGD7[title="Add Task"]');
    this.fillTaskArea = this.page.getByPlaceholder('Enter task description...');

    // this.wrapperClass = this.page.locator('.CardModal_mainContainer__dQo .global_scrollableY__X98fs');
    this.addCommentIcon = this.page.getByRole('button', { name: 'Add comment' }).nth(1);

    this.addCommentTextArea = this.page.locator('textarea[placeholder="Enter comment... [Ctrl+Enter] - submit"]');
    this.saveComment = this.page.getByRole('button', { name: 'Save' });
    this.assertComment = this.page.locator('.Comments_comments__Kdr3v');

    this.crossIcon = this.page.getByRole('button', { name: 'Close Card' });

    this.assertionOfCard = this.page.locator('.Card_card__zQfcO Card_cardOpen__zS98C .Card_details__wrmtl span svg title').nth(1);
  }

  public async navigateToBoardPage(): Promise<void> {
    await this.page.goto(`${this.boardUrl}`);
  }

  public async isCardVisible(): Promise<void> {
    await this.cardSelector.click();
    await this.page.goto(`${this.cardUrl}`);
    await expect(this.subscribeBtnSelector).toBeVisible();
  }

  public async addMembersFunction(): Promise<void> {
    await this.addMemberBtnSelector.click();
    await this.addMemberTextarea.click();
    await this.selectMemberBtn.click();
  }

  public async editDescriptionBox(): Promise<void> {
    await this.editDescriptionIcon.click();
    await this.descriptionBox.clear();
    await this.descriptionBox.fill('This is task one');
    await this.saveDescirptionBtn.click();
  }

  public async addTaskforAll(): Promise<void> {
    await this.addTaskIcon.click();
    // await this.selectTaskArea.click();
    await this.fillTaskArea.fill('Task One');
  }

  public async addCommentForAll(): Promise<void> {
    await this.addCommentIcon.click();
    // await expect(this.editingIconInsideTextbox).toBeVisible();

    await this.page.keyboard.type('Good Job Everyone!!!');
    await this.saveComment.click();
    await expect(this.assertComment).toBeVisible();
  }

  public async isCardDetailsAdded(): Promise<void> {
    await this.crossIcon.click();
  }
}
