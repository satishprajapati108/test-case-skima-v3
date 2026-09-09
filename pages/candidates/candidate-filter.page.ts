import { Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export type topHeaderTab = 'AllCandidate' | 'Duplicates' | 'Incomplete' | 'Uploadbatches';

export class CandidateFilterPage extends BasePage {

    //Top Header Locater
    readonly allCandidateTab = this.page.getByTestId('candidates-page-tab-all-candidates');
    readonly duplicatesTap = this.page.getByTestId('candidates-page-tab-duplicates');
    readonly incompleteTab = this.page.getByTestId('candidates-page-tab-incomplete');
    readonly uploadBatchTab = this.page.getByTestId('candidates-page-tab-uploads')

    //Under All Candidate Tab Filter locater
    readonly candidateSearchInput = this.page.getByTestId('');

    readonly allTab = this.page.getByTestId('candidates-tab-all');
    readonly linkedTab = this.page.getByTestId('candidates-tab-linked');
    readonly unLinkedTab = this.page.getByTestId('candidates-tab-unlinked');

    readonly entryChannelDropdown = this.page.getByTestId('candidates-filter-entry-channel-trigger');
    readonly visibiltyDropdown = this.page.getByTestId('candidates-filter-visibility-trigger');
    readonly locationDropdown = this.page.getByTestId('candidates-filter-location-trigger');


    //Under Duplicates Tab Filter locater
    readonly inDatabaseTab = this.page.getByTestId('duplicates-subtab-pending');
    readonly fromUploadTab = this.page.getByTestId('duplicates-subtab-from_uploads');
    readonly duplicatesResolvedTab = this.page.getByTestId('duplicates-subtab-resolved');

    //Under Incomplete Tab Filter locater
    readonly tofixTab = this.page.getByTestId('incomplete-subtab-to_fix');
    readonly failedParsesTab = this.page.getByTestId('incomplete-subtab-failed_parse');
    readonly missinginfoTab = this.page.getByTestId('incomplete-subtab-missing_info');
    readonly incompleteResolvedTab = this.page.getByTestId('incomplete-subtab-resolved');
    readonly ignoredTab = this.page.getByTestId('incomplete-subtab-ignored');


    //Under Upload Batch Tab Filter locater
    readonly searchBatchInput = this.page.getByTestId('uploads-search-input');
    readonly sourceDropdown = this.page.getByTestId('');


    //Top Tab Switching Logic
    private readonly tabsMap: Record<topHeaderTab, Locator> = {
        AllCandidate: this.allCandidateTab,
        Duplicates: this.duplicatesTap,
        Incomplete: this.incompleteTab,
        Uploadbatches: this.uploadBatchTab
    }

    async switchTopTabs(Tab: topHeaderTab) {
        await this.tabsMap[Tab].click();
    }







}