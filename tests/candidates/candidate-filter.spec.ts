import { test, expect } from '../../fixtures/index.fixture';
import { topHeaderTab } from '../../pages/candidates/candidate-filter.page';

test.describe('Candidate Filter', () => {
    //ALL CANDIDATES FILTER TEST
    test('Should able to switch top-level Tabs', async ({ page, candidateFilterPage }) => {

        async function expectTestIdText(
            locaterId : string,
            expectedText : string
        ) {
            await expect(page.getByTestId(locaterId)).toContainText(expectedText);
        }

        const tabs: topHeaderTab[] = ['AllCandidate', 'Duplicates', 'Incomplete', 'Uploadbatches'];

        for (let tab of tabs) {
            await candidateFilterPage.switchTopTabs(tab);

            if (tab === 'AllCandidate') {
                await expectTestIdText('candidates-upload-button', 'Upload Candidates');
            }
            if(tab === 'Duplicates'){
                await expectTestIdText('duplicates-subtab-resolved','Resolved');
            }
            if(tab === 'Incomplete'){
                await expectTestIdText('incomplete-subtab-to_fix','To fix')
            }
            if(tab === 'Uploadbatches'){
                await expectTestIdText('uploads-upload-resumes-button','+ Upload resumes')
            }
        }
    })

})