import { expect } from '@playwright/test';
import { BasePage } from '../base.page';

/** Document types offered by the "Add Document" dropdown (code -> display name). */
export const bgvDocumentTypes: Record<string, string> = {
    PANV: 'PAN Verification',
    VIDV: 'Voter ID Verification',
    DLV: 'Driving Licence Verification',
    LAV: 'Local Address Verification',
    PAV: 'Permanent Address Verification',
    LADV: 'Local Address Digital Verification',
    PADV: 'Permanent Address Digital Verification',
    LAPV: 'Local Address Postal Verification',
    PAPV: 'Permanent Address Postal Verification',
    CCRV: 'Criminal Court Record Verification',
    CC: 'Credit Check',
    BAV: 'Bank Account Verification',
    EDUV: 'Education Verification',
    EMPV: 'Employment Verification',
    EREF: 'Employment Reference Check',
    PRC: 'Professional Reference Check',
    PCC: 'Police Clearance Certificate',
    PVLF: 'Police Verification Via Law Firm',
    GDC: 'Global Database Check',
    PPV: 'Passport Verification',
    CVV: 'CV Verification',
    DRG: 'Drug Test',
};

/**
 * Types whose modal has a single text input (the document UID). Value is the sample UID.
 * Types not listed here have fields we haven't mapped yet - see addDocument().
 */
export const bgvUidSamples: Record<string, string> = {
    PANV: 'ABCDE1234F',
    VIDV: 'ABC1234567',
    DLV: 'MH1420110012345',
    CC: 'ABCDE1234F',
};

/** Address-style types: the modal is either one address box or the long structured form. */
export const bgvAddressTypes = ['LAV', 'PAV', 'LADV', 'PADV', 'LAPV', 'PAPV', 'CCRV'];

const addressSample = {
    co: 'Father Name',
    line1: '123 Test Street',
    line2: 'Near Test Landmark',
    locality: 'Test Locality',
    landmark: 'Test Landmark',
    pincode: '411001',
    fullAddress: '123 Test Street, Near Test Landmark, Pune, Maharashtra 411001',
};

export class BackgroundVerificationFlow extends BasePage {
    //Job Selection
    readonly jobsSearchInput = this.page.getByTestId('jobs-search-input');
    readonly jobsPageName = (jobName: string) => this.page.getByText(jobName, { exact: true }).first();

    //Candidate Card Menu
    readonly candidateMenuTriggers = this.page.getByTestId('candidate-card-menu-trigger');
    readonly verifyDocumentsMenuItem = this.page.getByTestId('candidate-card-menu-verify-documents');

    //Add Document
    readonly addDocumentButton = this.page.getByRole('button', { name: 'Add Document' });
    // The verify-documents dialog stays open underneath, so target only the Add Document modal
    readonly modal = this.page.getByRole('dialog').filter({ hasText: /Document Type\s*\*/ });
    readonly documentTypeSelect = this.modal.getByRole('combobox');
    readonly documentTypeOption = (name: string) => this.page.locator('.ant-select-item-option').filter({ hasText: name }).first();
    readonly uidInput = this.modal.locator('input:not([role="combobox"])').first();
    // Address modal - single box variant
    readonly singleAddressInput = this.modal.getByPlaceholder('House no, street, city, state, pincode', { exact: true });

    // Address modal - structured form variant
    readonly careOfInput = this.modal.getByPlaceholder('e.g. Ramesh Sharma', { exact: true });
    readonly addressLine1Input = this.modal.getByPlaceholder('House / flat no, street', { exact: true });
    readonly addressLine2Input = this.modal.getByPlaceholder('e.g. Andheri East', { exact: true });
    readonly localityInput = this.modal.getByPlaceholder('e.g. Chakala', { exact: true });
    readonly landmarkInput = this.modal.getByPlaceholder('e.g. Near City Mall', { exact: true });
    readonly pincodeInput = this.modal.getByPlaceholder('e.g. 400001', { exact: true });
    readonly districtInput = this.modal.getByPlaceholder('e.g. Mumbai Suburban', { exact: true });
    readonly fullAddressInput = this.modal.getByPlaceholder('e.g. 12, MG Road, Andheri East, Mumbai 400069', { exact: true });
    readonly localFullAddressInput = this.modal.getByPlaceholder('e.g. full address in the local language', { exact: true });
    readonly localLanguageCodeInput = this.modal.getByText('Local Language Code').locator('xpath=following::input[1]');

    readonly saveButton =this.modal.getByRole('button', { name: 'Save' });
    readonly cancelButton = this.modal.getByRole('button', { name: 'Cancel' });

    async openJob(jobName: string) {
        await this.jobsSearchInput.fill(jobName);
        await this.jobsPageName(jobName).waitFor({ state: 'visible', timeout: 15000 });
        await this.jobsPageName(jobName).click();
        await this.candidateMenuTriggers.first().waitFor({ state: 'visible', timeout: 15000 });
    }

    async getCandidateMenuCount() {
        return this.candidateMenuTriggers.count();
    }

    async openVerifyDocumentsForFirstCandidate() {
        const trigger = this.candidateMenuTriggers.first();
        // The menu can close if the card list re-renders, so re-open until the item shows
        await expect(async () => {
            await trigger.hover();
            await trigger.click();
            await expect(this.verifyDocumentsMenuItem).toBeVisible({ timeout: 2000 });
        }).toPass({ timeout: 20000 });
        await this.verifyDocumentsMenuItem.click();
        await this.addDocumentButton.waitFor({ state: 'visible', timeout: 15000 });
    }

    /**
     * One full cycle: Add Document -> pick type in the modal -> fill fields -> Save.
     * Returns false (and cancels the modal) when the type's fields aren't mapped yet.
     */
    async addDocument(code: string): Promise<boolean> {
        await this.addDocumentButton.click();
        await expect(this.modal).toBeVisible({ timeout: 10000 });

        // Search by name so the long list never needs scrolling
        await this.documentTypeSelect.click();
        await this.documentTypeSelect.fill(bgvDocumentTypes[code]);
        await this.documentTypeOption(bgvDocumentTypes[code]).click();

        const uid = bgvUidSamples[code];
        if (uid !== undefined) {
            await this.uidInput.fill(uid);
        } else if (bgvAddressTypes.includes(code)) {
            await this.fillAddress();
        } else {
            await this.cancelButton.click();
            await expect(this.modal).toHaveCount(0, { timeout: 5000 });
            return false;
        }

        await this.saveButton.click();
        await expect(this.modal).toHaveCount(0, { timeout: 15000 });
        return true;
    }

    /** Fills whichever address variant the modal shows after the type is selected. */
    private async fillAddress() {
        await this.singleAddressInput.or(this.careOfInput).first().waitFor({ state: 'visible', timeout: 10000 });

        if (await this.singleAddressInput.isVisible()) {
            await this.singleAddressInput.fill(addressSample.fullAddress);
            return;
        }

        await this.careOfInput.fill(addressSample.co);
        await this.addressLine1Input.fill(addressSample.line1);
        await this.addressLine2Input.fill(addressSample.line2);
        await this.localityInput.fill(addressSample.locality);
        await this.landmarkInput.fill(addressSample.landmark);

        // Pincode auto-fills Village/Town/City, District and State
        await this.pincodeInput.fill(addressSample.pincode);
        await expect(this.districtInput).not.toHaveValue('', { timeout: 15000 });

        await this.fullAddressInput.fill(addressSample.fullAddress);
        await this.localFullAddressInput.fill(addressSample.fullAddress);
        await this.fillLocalLanguageCode();
    }

    /** Local Language Code may be a select or a text box - the valid value is still unconfirmed. */
    private async fillLocalLanguageCode() {
        const role = await this.localLanguageCodeInput.getAttribute('role');
        if (role === 'combobox') {
            await this.localLanguageCodeInput.click();
            await this.page.locator('.ant-select-item-option').first().click();
        } else {
            await this.localLanguageCodeInput.fill('hi');
        }
    }
}
