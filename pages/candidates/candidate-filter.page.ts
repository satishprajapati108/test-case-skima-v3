import { Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export type topHeaderTab = 'AllCandidate' | 'Duplicates' | 'Incomplete' | 'Uploadbatches';
export type subTab = "All" | "Linked" | "Unlinked";


export class CandidateFilterPage extends BasePage {

    //Top Header Locater
    readonly allCandidateTab = this.page.getByTestId('candidates-page-tab-all-candidates');
    readonly duplicatesTap = this.page.getByTestId('candidates-page-tab-duplicates');
    readonly incompleteTab = this.page.getByTestId('candidates-page-tab-incomplete');
    readonly uploadBatchTab = this.page.getByTestId('candidates-page-tab-uploads')

    //Under All Candidate Tab Filter locater
    readonly candidateSearchInput = this.page.getByTestId('candidates-search-input');

    readonly allTab = this.page.getByTestId('candidates-tab-all');
    readonly linkedTab = this.page.getByTestId('candidates-tab-linked');
    readonly unLinkedTab = this.page.getByTestId('candidates-tab-unlinked');

    readonly entryChannelDropdown = this.page.getByTestId('candidates-filter-entry-channel-trigger');
    readonly entryChannelDropdownPanel = this.page.getByTestId('candidates-filter-entry-channel-trigger-panel');
    readonly applyEntryChannelDropdownBtn = this.page.getByTestId('candidates-filter-entry-channel-trigger-apply');

    readonly visibiltyDropdown = this.page.getByTestId('candidates-filter-visibility-trigger');
    readonly visibiltyDropdownPanel = this.page.getByTestId('candidates-filter-visibility-trigger-panel');
    readonly applyvisibiltyDropdownBtn = this.page.getByTestId('candidates-filter-visibility-trigger-apply');


    readonly locationDropdown = this.page.getByTestId('candidates-filter-location-trigger');
    readonly locationDropdownPanel = this.page.getByTestId('candidates-filter-location-trigger-panel');
    readonly locationDropdownSearch = this.page.getByTestId('candidates-filter-location-trigger-search');
    readonly locationDropdownApplyBtn = this.page.getByTestId('candidates-filter-location-trigger-apply');


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



    // ----------------------------------Logic--------------------------------------------


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


    //Under all Tab Section 

    //Switch subFilter under ALL section
    private readonly allSubTabMaps: Record<subTab, Locator> ={
        All : this.allTab,
        Linked: this.linkedTab,
        Unlinked: this.unLinkedTab

    }

    async underAllTabSwitch(Tab : subTab){
        await this.allSubTabMaps[Tab].click();
    }

    // Entry Channel DropDown Filter
    async openEntryChannelDropdownPanel(){
        await this.entryChannelDropdown.click();
    }

    async selectEntryChanneloption(option:string){
        await this.entryChannelDropdownPanel.getByText(option, { exact: true }).click();
    }

    async applyEntryChannelFilter(option:string){
        await this.openEntryChannelDropdownPanel();
        await this.selectEntryChanneloption(option);
        await this.applyEntryChannelDropdownBtn.click();
    }

    // Visibility DropDown Filter
    async openVisibilityDropDownPanel(){
        await this.visibiltyDropdown.click();
    }

    async selectVisibiltyDropDownOption(option:string){
        await this.visibiltyDropdownPanel.getByText(option, {exact:true}).click();

    }

    async applyVisibilityDropdownFilter(option:string){
        await this.openVisibilityDropDownPanel();
        await this.selectVisibiltyDropDownOption(option);
        await this.applyvisibiltyDropdownBtn.click();

    }

    // Location DropDown Filter
    async openLocationDropdown(){
        await this.locationDropdown.click();
    }

    async selectLocationOptions(options:string[]){

        for(let option of options){
            await this.locationDropdownSearch.fill(option);
            await this.locationDropdownPanel.getByText(option, {exact: false}).click();
        }
        
    }

    async applyLocationFilter(options:string[]){
        await this.openLocationDropdown();
        await this.selectLocationOptions(options);
        await this.locationDropdownApplyBtn.click();
    }






}