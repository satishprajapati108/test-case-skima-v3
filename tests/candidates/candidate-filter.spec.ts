import { test, expect } from '../../fixtures/index.fixture';
import { subTab, topHeaderTab } from '../../pages/candidates/candidate-filter.page';

test.describe('Candidate Filter', () => {
    //ALL CANDIDATES FILTER TEST
    test('Should able to switch top-level Tabs', async ({ page, candidateFilterPage }) => {

        async function expectTestIdText(
            locaterId: string,
            expectedText: string
        ) {
            await expect(page.getByTestId(locaterId)).toContainText(expectedText);
        }

        const tabs: topHeaderTab[] = ['AllCandidate', 'Duplicates', 'Incomplete', 'Uploadbatches'];

        for (let tab of tabs) {
            await candidateFilterPage.switchTopTabs(tab);

            if (tab === 'AllCandidate') {
                await expectTestIdText('candidates-upload-button', 'Upload Candidates');
            }
            if (tab === 'Duplicates') {
                await expectTestIdText('duplicates-subtab-resolved', 'Resolved');
            }
            if (tab === 'Incomplete') {
                await expectTestIdText('incomplete-subtab-to_fix', 'To fix')
            }
            if (tab === 'Uploadbatches') {
                await expectTestIdText('uploads-upload-resumes-button', '+ Upload resumes')
            }
        }
    })


    test('Switch Tab Under All tab section ', async ({ page, candidateFilterPage }) => {

        const subTab: subTab[] = ['All', 'Linked', 'Unlinked'];

        for (let tab of subTab) {
            await candidateFilterPage.underAllTabSwitch(tab);

            const rows = page.getByTestId('candidates-row');

            await rows.first().waitFor({ state: 'visible', timeout: 2000 }).catch(() => {
                console.log('No Rows Found');
            })

            const count = await rows.count();
            console.log(`${tab} rows :  ${count}`);

            if (tab === 'Linked') {
                const linkedcols = page.getByTestId('candidates-row-linked-jobs');
                for (let i = 0; i < count; i++) {
                    await expect(linkedcols.nth(i)).not.toHaveText('Link to a job');
                }

            }
            if (tab === 'Unlinked') {
                const unlinkedcols = page.getByTestId('candidates-row-linked-jobs');
                for (let i = 0; i < count; i++) {
                    await expect(unlinkedcols.nth(i)).toHaveText('Link to a job');
                }
            }

        }

    })


    test('Entry Channel DropDown Filter Test', async ({ page, candidateFilterPage }) => {

        const dropDownValues = ['Email', 'Job Posting', 'ATS', 'Global', 'Chrome Extension', 'Manual Upload']

        for (let value of dropDownValues) {
            await candidateFilterPage.applyEntryChannelFilter(value);

            const row = page.getByTestId('candidates-row');
            await row.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => { console.log('No Record Found') });

            const count = await row.count();
            console.warn(`EntryChannel - ${value} count : ${count}`);
        }

    })

    test('Visibility DropDown Filter Test', async ({ page, candidateFilterPage }) => {
        const visibilityDropdownOption = ['Included in Search', 'Excluded from Search'];

        for (let value of visibilityDropdownOption) {
            await candidateFilterPage.applyVisibilityDropdownFilter(value);

            const row = page.getByTestId('candidates-row');
            await row.first().waitFor({ state: 'visible', timeout: 4000 }).catch(() => {
                console.warn('No Record Found');
            })

            const count = await row.count();

            console.log(`${value} count : ${count}`);

            const visibilitcols = page.getByTestId('candidates-row-exclude_from_search');
            if (value === 'Included in Search') {
                for (let i = 0; i < count; i++) {
                    await expect(visibilitcols.nth(i)).toHaveText('No');
                }
            }
            if (value === 'Excluded from Search') {
                for (let i = 0; i < count; i++) {
                    await expect(visibilitcols.nth(i)).toHaveText('Yes');
                }
            }
        }

    })

    test('Location DropDown Filter Test', async({page, candidateFilterPage})=>{

        const locations = ['lucknow', 'mumbai'];

        await candidateFilterPage.applyLocationFilter(locations);

        const row = page.getByTestId('candidates-row');
        await row.first().waitFor({state:'visible', timeout:5000}).catch(()=>{
            console.warn('No Record Found')
        })

        const count = await row.count();
        console.log(count)

        const locationCols = page.getByTestId('candidates-row-location');

        for(let i = 0; i < count; i++){
            await expect(locationCols.getByText(locationCols, {exact:false})).toHaveText(locations);
        }

    })


})