import path from 'path';
import { expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class JobsCreationFlow extends BasePage {
    readonly newJobButton = this.page.getByTestId('jobs-create-button');
    readonly startFromJdOption = this.page.getByTestId('jobs-create-entry-start-from-jd-button');
    readonly jdFileInput = this.page.locator('input[type="file"]');

    readonly continueToScoringCriteriaButton = this.page.getByTestId('jobs-create-details-continue-button');
    readonly generateScoringCriteriaButton = this.page.getByRole('button', { name: 'Generate scoring criteria' });
    readonly publishScoringButton = this.page.getByRole('button', { name: 'Publish scoring' });
    readonly goToCandidatesButton = this.page.getByRole('button', { name: 'Go to candidates' });

    async uploadJd(fileName: string) {
        await this.newJobButton.click();
        await this.startFromJdOption.click();
        await this.jdFileInput.setInputFiles(path.join(__dirname, '../../jds', fileName));
    }

    async continueToScoringCriteria() {
        await expect(this.continueToScoringCriteriaButton).toBeEnabled({ timeout: 4 * 60 * 1000 });
        await this.continueToScoringCriteriaButton.click();
    }

    async generateScoringCriteria() {
        await this.generateScoringCriteriaButton.click();
    }

    async publishScoring() {
        await expect(this.publishScoringButton).toBeEnabled({ timeout: 10 * 60 * 1000 });
        await this.publishScoringButton.click();
    }

    async goToCandidates() {
        await this.goToCandidatesButton.click();
    }

}
