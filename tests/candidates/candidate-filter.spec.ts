import { test, expect } from '../../fixtures/index.fixture';
import { topHeaderTab } from '../../pages/candidates/candidate-filter.page';

test.describe('Candidate Filter', () => {
    test('Should able to switch top-level Tabs', async ({ candidateFilterPage }) => {
        const tabs: topHeaderTab[] = ['AllCandidate', 'Duplicates', 'Incomplete', 'Uploadbatches'];

        for (let tab of tabs) {
            await candidateFilterPage.switchTopTabs(tab);
        }

    })

})