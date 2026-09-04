import { test, expect } from '../../fixtures/auth.fixture';
import { JobsFilterPage, Label, statusMap } from '../../pages/jobs/jobs-filter.page';

test.describe('jobs filter', () => {


    test('Should be able to switch between tabs', async ({ page }) => {
        const jobFilterObj = new JobsFilterPage(page);
        await page.goto('/jobs');

        const labels: Label[] = ['All', 'Draft', 'NeedSetup', 'ScoringOn'];

        for (const label of labels) {
            await jobFilterObj.switchTotab(label);
            const param = statusMap[label];
            const expectedUrl = param
                ? `${new URL(page.url()).origin}/jobs?by_status=${param}`
                : `${new URL(page.url()).origin}/jobs`;
            await expect(page).toHaveURL(expectedUrl);
        }
    })

    test('should be able to filter jobs by status', async ({ page }) => {
        const jobFilterObj = new JobsFilterPage(page);
        await page.goto('/jobs');

        const jobStatusOptions = await jobFilterObj.getJobStatusFilterOptions();
        console.log('Job Status Filter Options:', jobStatusOptions);

        for (const option of jobStatusOptions) {
            await jobFilterObj.filterByJobStatus(option);
        }
    })

    test('should be able to filter jobs by isPublished', async ({ page }) => {
        const jobFilterObj = new JobsFilterPage(page);
        await page.goto('/jobs');

        await jobFilterObj.filterByIsPublished();

    })

    test('should be able to filter jobs by ATS status', async ({ page }) => {
        const jobFilterObj = new JobsFilterPage(page);
        await page.goto('/jobs');

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

    test('should be able to filter jobs by client', async ({ page }) => {
        const jobFilterObj = new JobsFilterPage(page);
        await page.goto('/jobs');

        await jobFilterObj.filterbyClient('Janes Street');

    })


})