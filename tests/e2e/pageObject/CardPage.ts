import { Locator, Page, expect } from 'playwright/test';

export class CardPage {
  private readonly page: Page;

  private readonly learn4gaBoardsSelector: Locator;

  private readonly cardSelector: Locator;
  public readonly subscribeBtnSelector: Locator;

  private readonly addMemberBtnSelector: Locator;
  private readonly addMemberTextarea: Locator;
  private readonly selectMemberBtn: Locator;
  private readonly crossMemberIcon: Locator;

  private readonly editDescriptionIcon: Locator;
  private readonly descriptionBox: Locator;
  private readonly saveDescirptionBtn: Locator;

  private readonly addTaskIcon: Locator;

  private readonly fillTaskArea: Locator;

  private readonly addCommentButton: Locator;
  private readonly saveComment: Locator;

  public readonly assertCard: Locator;
  public readonly descriptionText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.learn4gaBoardsSelector = this.page.getByRole('button', { name: 'Learn 4ga Boards' }).nth(0);

    this.cardSelector = this.page.locator('.Card_wrapper__kLQpI', {
      has: this.page.locator('[title="Different language of Getting Started?"]'),
    });

    this.subscribeBtnSelector = this.page.getByText('Different language of Getting Started?').locator('xpath=ancestor::div[contains(@class,"CardModal_headerFirstLine")]');

    this.addMemberBtnSelector = this.page.getByTitle('Add Member');
    this.addMemberTextarea = this.page.locator('input[placeholder="Search members..."]');
    this.selectMemberBtn = this.page.locator('button', { hasText: 'Demo Demo' });
    this.crossMemberIcon = this.page.locator('button[title="Close"]');

    this.editDescriptionIcon = this.page.getByRole('button', { name: 'Edit Description' }).nth(0);
    this.descriptionBox = this.page.locator('textarea[placeholder="Enter description..."]');
    this.saveDescirptionBtn = this.page.locator('button[type="submit"][title="Save"]');

    this.addTaskIcon = this.page.locator('button.Tasks_taskButton__eNGD7[title="Add Task"]');
    this.fillTaskArea = this.page.getByPlaceholder('Enter task description...');

    this.addCommentButton = this.page.getByRole('button', { name: 'Add comment' }).nth(1);
    this.saveComment = this.page.locator('button[title="Save"]');

    const card = page.locator('.Card_details__wrmtl:visible').first();
    this.assertCard = card.locator('button[data-prevent-card-switch="true"][title="Show Tasks"]');

    this.descriptionText = this.page.getByText('this is task 1');
  }
  public async navigateToBoardPage(): Promise<void> {
    await this.learn4gaBoardsSelector.click();
  }

  public async isCardVisible(): Promise<void> {
    await this.cardSelector.click();
    await expect(this.subscribeBtnSelector).toBeVisible();
  }
  public async addMembersToCard(): Promise<void> {
    await this.addMemberBtnSelector.click();
    await this.addMemberTextarea.click();
    await this.selectMemberBtn.click();
    await this.crossMemberIcon.click();
  }

  public async editDescriptionBox(description: string): Promise<void> {
    await this.editDescriptionIcon.click();
    await this.descriptionBox.clear();
    await this.descriptionBox.fill(description);
    await this.saveDescirptionBtn.click();
  }

  public async addTaskforAll(task: string): Promise<void> {
    await this.addTaskIcon.click();
    await this.fillTaskArea.fill(task);
  }

  public async addCommentForAll(): Promise<void> {
    await this.addCommentButton.click();
    await this.page.keyboard.type('Hello');
    await this.page.keyboard.press('Enter');
    await this.saveComment.click();
  }
}
