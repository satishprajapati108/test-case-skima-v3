import { Locator } from 'playwright';
import { BasePage } from '../base.page';

export type Label = 'All' | 'Draft' | 'NeedSetup' | 'ScoringOn';

export const statusMap: Record<Label, string> = {
    All: '',
    Draft: 'Draft',
    NeedSetup: 'Scoring+Setup',
    ScoringOn: 'Scoring+On',

}

const isPublishedFilterOptionsList = ['Yes', 'No'];

export class JobsFilterPage extends BasePage {

    //Switch tab Locater
    readonly all = this.page.getByTestId('jobs-segment-tab-all');
    readonly draft = this.page.getByTestId('jobs-segment-tab-draft');
    readonly needSetup = this.page.getByTestId('jobs-segment-tab-needs-setup');
    readonly scoringOn = this.page.getByTestId('jobs-segment-tab-scoring-on');

    //Job Status Filter Locater
    readonly jobStatusFilterOpen = this.page.getByTestId('jobs-filter-job-status-dropdown');
    readonly jobStatusFilterOptions = this.page.getByRole('option');
    readonly jobstatusApplyButton = this.page.getByTestId('jobs-filter-job-status-trigger-apply');

    //isPublished Filter Locater
    readonly isPublishedFilterOpen = this.page.getByTestId('jobs-filter-is-published-trigger');
    readonly isPublishedFilterOptions = this.page.getByRole('option');
    readonly isPublishedApplyButton = this.page.getByTestId('jobs-filter-is-published-trigger-apply');

    //ATS Status Filter Locater
    readonly atsFilterOpen = this.page.getByTestId('jobs-filter-ats-status-trigger');
    readonly atsFilterOptions = this.page.getByRole('option');
    readonly atsApplyButton = this.page.getByTestId('jobs-filter-ats-status-trigger-apply');

    //Client Filter Locater
    readonly clientFilterOpen = this.page.getByTestId('jobs-filter-client-trigger');
    readonly clientSearchInput = this.page.getByTestId('jobs-filter-client-trigger-search');
    readonly clientListOption = this.page.getByRole('option');
    readonly clientApplyButton = this.page.getByTestId('jobs-filter-client-trigger-apply');
    readonly removeFilterIcon = this.page.getByTestId('');


    


    //Switch tab Logic
    private readonly tabmap: Record<Label, Locator> = {
        All: this.all,
        Draft: this.draft,
        NeedSetup: this.needSetup,
        ScoringOn: this.scoringOn,
    }

    async switchTotab(label: Label) {
        await this.tabmap[label].click();
    }

    //Job Status Filter Logic
    async openJobStatusFilter() {
        const isOpen = await this.jobStatusFilterOptions.first().isVisible().catch(() => false);
        if (!isOpen) {
            await this.jobStatusFilterOpen.click();
        }
        try {
            await this.jobStatusFilterOptions.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch (e) {
        }

    }

    async getJobStatusFilterOptions(): Promise<string[]> {
        await this.openJobStatusFilter();
        return await this.jobStatusFilterOptions.allTextContents();
    }

    async filterByJobStatus(status: string) {
        await this.openJobStatusFilter();
        await this.page.getByText(status, { exact: true }).click();
        await this.jobstatusApplyButton.click();
    }


    //isPublished Filter Logic
    async openIsPublishedFilter() {
        const open = await this.isPublishedFilterOptions.first().isVisible().catch(() => false);
        if (!open) {
            await this.isPublishedFilterOpen.click();
        }
        try {
            await this.isPublishedFilterOptions.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch (e) {
        }
    }


    async filterByIsPublished() {

        for (const option of isPublishedFilterOptionsList) {
            await this.openIsPublishedFilter();
            await this.isPublishedFilterOptions.getByText(option, { exact: true }).click();
            await this.isPublishedApplyButton.click();
        }

    }

    //ATS Status Filter Logic
    async openATSFilter() {
        const open = await this.atsFilterOptions.first().isVisible().catch(() => false);
        if (!open) {
            await this.atsFilterOpen.click();
        }
        try {
            await this.atsFilterOptions.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch (e) {

        }
    }

    async getAtsFilterOptions(): Promise<string[]> {
        await this.openATSFilter();
        const count = await this.atsFilterOptions.count();
        if (count === 0) {
            return [];
        }
        return await this.atsFilterOptions.allTextContents();
    }

    async filterByATSStatus(status: string) {
        await this.openATSFilter();
        await this.page.getByText(status, { exact: true }).click();
        await this.atsApplyButton.click();
    }

    //Client Filter Logic
    async openClientFilter() {
        await this.clientFilterOpen.click();
    }

    async getClientFilterOptions(): Promise<string[]> {
        await this.openClientFilter();
        return await this.clientListOption.allTextContents();
    }

    async searchClient(clientName: string) {
        const count = await this.getClientFilterOptions();
        if(count.length === 0){
            console.warn('No client filter options available. Skipping the search.');
            return [];
        }
        await this.clientSearchInput.fill(clientName);
    }

    async filterbyClient(clientName: string) {
        await this.searchClient(clientName);
        await this.clientListOption.getByText(clientName, { exact: true }).click();
        await this.clientApplyButton.click();

    }


}

