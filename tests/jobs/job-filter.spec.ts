import { count } from 'console';
import { test, expect } from '../../fixtures/index.fixture';
import { Label, statusMap } from '../../pages/jobs/jobs-filter.page';

test.describe('jobs filter', () => {

    test('Should be able to search Job', async ({ page, jobFilterPage: jobFilterObj }) => {
        const searchJob = 'Product Manager';
        await jobFilterObj.searchJob(searchJob);

        const searchResult = page.getByTestId('jobs-table-row-title-button');
        const count = await searchResult.count();

        expect(count, `No search found for this search result: "${searchJob}"`).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            await expect(searchResult.nth(i)).toContainText(searchJob, { ignoreCase: true });
        }
    })


    test('Should be able to switch between tabs', async ({ page, jobFilterPage: jobFilterObj }) => {
        const labels: Label[] = ['All', 'Draft', 'NeedSetup', 'ScoringOn'];

        const verifyTabRows = async (
            statusTestId: string,
            expectedText: string
        ) => {
            const rows = page.getByTestId('jobs-table-row');
            await rows.first().waitFor({ state: 'visible', timeout: 2000 }).catch(() => { console.warn('No rows found') });
            const statusField = page.getByTestId(statusTestId);

            const rowCount = await rows.count();
            console.log(`${expectedText} rows :`, rowCount);
            expect(rowCount, "No job Found").toBeGreaterThan(0);

            const statusCount = await statusField.count();
            expect(statusCount, `Row count and status field count mismatch`).toBe(rowCount);

            for (let i = 0; i < statusCount; i++) {
                expect(statusField.nth(i)).toContainText(expectedText);
            }
        }

        for (const label of labels) {
            await jobFilterObj.switchToTab(label);

            if (label === 'Draft') {
                await verifyTabRows('jobs-table-row-scoring-setup-button', 'Set up scoring');
            }

            if (label === 'ScoringOn') {
                await verifyTabRows('jobs-table-row-scoring-status', 'Scoring On')
            }
        }
    })


    test('should be able to filter jobs by status', async ({ page, jobFilterPage: jobFilterObj }) => {
        const jobStatusOptions = await jobFilterObj.getJobStatusFilterOptions();
        console.log('Job Status Filter Options:', jobStatusOptions);

        for (const option of jobStatusOptions) {
            await jobFilterObj.filterByJobStatus(option);

            const rows = page.getByTestId('jobs-table-row');
            await rows.first().waitFor({ state: 'visible', timeout: 2000 }).catch(() => { });

            const count = await rows.count();

            if (count === 0) {
                console.warn(`No jobs found for status: "${option}" — skipping check`);
                continue;
            }

            const statusField = page.getByTestId('jobs-table-row-job-status');
            const statusCount = await statusField.count();

            for (let i = 0; i < statusCount; i++) {
                await expect(statusField.nth(i)).toContainText(option);
            }
        }
    })

    test('should be able to filter jobs by isPublished', async ({ page, jobFilterPage: jobFilterObj }) => {
        const isPublishedFilterOptionsList = ['Yes', 'No'];

        for (const option of isPublishedFilterOptionsList) {
            await jobFilterObj.filterByIsPublished(option);

            const rows = page.getByTestId('jobs-table-row');
            await rows.first().waitFor({ state: 'visible', timeout: 2000 }).catch(() => { })

            const rowscount = await rows.count();

            if (rowscount === 0) {
                console.warn(`No jobs found for isPublised: "${option}" — skipping check`);
                continue;
            }

            const statusField = page.getByTestId('jobs-table-row-job-status');

            for (let i = 0; i < rowscount; i++) {
                if (option === 'Yes') {
                    await expect(statusField.nth(i)).toContainText('Published');
                }
                if (option === 'No') {
                    await expect(statusField.nth(i)).not.toContainText('Published');
                }
            }
        }

    })

    test('should be able to filter jobs by ATS status', async ({ jobFilterPage: jobFilterObj }) => {
        const atsStatusOptions = await jobFilterObj.getAtsFilterOptions();
        console.log('ATS Status Filter Options:', atsStatusOptions);

        if (atsStatusOptions.length === 0) {
            console.warn('No ATS status filter options available. Skipping the test.');
            return;
        }

        for (const option of atsStatusOptions) {
            await jobFilterObj.filterByATSStatus(option);
        }

    })

    test('should be able to filter jobs by client', async ({ page, jobFilterPage: jobFilterObj }) => {
        const clientName = 'Janes Street';
        await jobFilterObj.filterByClient(clientName);

        const rows = page.getByTestId('jobs-table-row');
        await rows.first().waitFor({ state: 'visible', timeout: 2000 }).catch(() => { });

        const rowcount = await rows.count();

        if (rowcount === 0) {
            console.warn(`No Job found for this - ${clientName}`);
            return;
        }

        const clientField = page.getByTestId('jobs-table-row-client');

        for (let i = 0; i < rowcount; i++) {
            await expect(clientField.nth(i)).toContainText(clientName);

        }

    })



    test('should be able to filter jobs by location', async ({ page, jobFilterPage: jobFilterObj }) => {
        const locations = ['Chennai', 'Mumbai']


        await jobFilterObj.filterByLocation(locations);

        const rows = page.getByTestId('jobs-table-row');
        await rows.first().waitFor({ state: 'visible', timeout: 2000 }).catch(() => { });

        const rowcount = await rows.count();

        console.log(rowcount);
        if (rowcount === 0) {
            console.warn(`No jobs found for locations: ${locations.join(', ')} — skipping check`);
            return;
        }

        const locationField = page.getByTestId('jobs-table-row-location');
        console.log(locationField);
        const locationRegex = new RegExp(locations.join('|'), 'i');
        console.log(locationRegex);

        for (let i = 0; i < rowcount; i++) {
            await expect(locationField.nth(i)).toContainText(locationRegex);
        }

    })

    test('should be able to filter jobs by deleted', async ({ page, jobFilterPage: jobFilterObj }) => {
        await jobFilterObj.applyDeletedJObFilter();

        const rows = page.getByTestId('jobs-table-row');
        await rows.first().waitFor({ state: 'visible', timeout: 2000 }).catch(() => { });

        const rowcount = await rows.count();

        if (rowcount === 0) {
            console.warn(`No Deleted Job Found — skipping check`);
            return;
        }

        const statusField = page.getByTestId('jobs-table-row-scoring-status');
        for (let i = 0; i < rowcount; i++) {
            await expect(statusField.nth(i)).toContainText('Deleted');
        }

    })

    test('should be able to filter jobs by Hiring Manager', async ({ jobFilterPage: jobFilterObj }) => {

        const HiringManagerName = 'Ajay singh';
        await jobFilterObj.filterByHiringManager(HiringManagerName);

    })

    test('should be able to filter jobs by Created At Date', async ({ page, jobFilterPage: jobFilterObj }) => {

        const startDate = '2026-07-24';
        const endDate = '2026-07-30';

        await jobFilterObj.filterByCreatedAt(startDate, endDate);

        const rows = page.getByTestId('jobs-table-row');
        await rows.first().waitFor({ state: 'visible', timeout: 2000 }).catch(() => { });

        const rowcount = await rows.count();
        if (rowcount === 0) {
            console.warn(`No found found from ${startDate} to ${endDate}'`);
            return
        }
        console.log(rowcount);

        const createdAtField = page.getByTestId('jobs-table-row-date-posted');

        for (let i = 0; i < rowcount; i++) {
            const dateText = await createdAtField.nth(i).textContent();
            const [day, month, year] = dateText!.trim().split('/');
            const rowDate = `${year}-${month}-${day}`;

            console.log(rowDate);

            const inRange = rowDate >= startDate && rowDate <= endDate;
            await expect(inRange, `Row ${i} date "${dateText}" is outside ${startDate} to ${endDate}`).toBeTruthy();
        }

    })


})