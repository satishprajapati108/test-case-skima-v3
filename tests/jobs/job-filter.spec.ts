import { test, expect } from '../../fixtures/commons.fixture';
import { Label, statusMap } from '../../pages/jobs/jobs-filter.page';

test.describe('jobs filter', () => {

    test('Should be able to search Job', async ({jobFilterPage: jobFilterObj})=>{
        const searchJob = 'bmw';
        await jobFilterObj.searchJob(searchJob);
    })


    test('Should be able to switch between tabs', async ({ page, jobFilterPage: jobFilterObj }) => {
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

    test('should be able to filter jobs by status', async ({ jobFilterPage: jobFilterObj }) => {
        const jobStatusOptions = await jobFilterObj.getJobStatusFilterOptions();
        console.log('Job Status Filter Options:', jobStatusOptions);

        for (const option of jobStatusOptions) {
            await jobFilterObj.filterByJobStatus(option);
        }
    })

    test('should be able to filter jobs by isPublished', async ({ jobFilterPage: jobFilterObj }) => {
        await jobFilterObj.filterByIsPublished();

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

    test('should be able to filter jobs by client', async ({ jobFilterPage: jobFilterObj }) => {
        await jobFilterObj.filterbyClient('Janes Street');

    })

    test('should be able to filter jobs by location', async ({ jobFilterPage: jobFilterObj }) => {
        const locations = ['Chennai', 'Mumbai']
        await jobFilterObj.filterByLocation(locations);
    })

    test('should be able to filter jobs by deleted', async ({ jobFilterPage: jobFilterObj }) => {
        await jobFilterObj.applyDeletedJObFilter();

    })

    test('should be able to filter jobs by Hiring Manager', async ({ jobFilterPage: jobFilterObj }) => {

        const HiringManagerName = 'Ajay singh'; 
        await jobFilterObj.filterByHiringManager(HiringManagerName);

    })

    test('should be able to filter jobs by Created At Date', async ({ jobFilterPage: jobFilterObj }) => {

        const startDate = '2026-09-04';
        const endDate = '2026-09-01';

        await jobFilterObj.filterByCreatedAt(startDate, endDate);

    })






})