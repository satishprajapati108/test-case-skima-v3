import fs from 'fs';
import path from 'path';
import { test, expect } from '../../fixtures/index.fixture';

test.describe('Job Creation Flow', () => {
    test.describe.configure({ mode: 'parallel' });

    const jdsDir = path.join(__dirname, '../../jds');
    const jdFiles = fs.readdirSync(jdsDir);

    if (jdFiles.length === 0) {
        console.warn('No JD files available in jds/. Skipping the tests.');
    }

    for (const jdFile of jdFiles) {
        test(`should be able to create a job by uploading ${jdFile}`, async ({ jobCreationFlow }) => {
            test.setTimeout(16 * 60 * 1000);

            await jobCreationFlow.uploadJd(jdFile);
            await jobCreationFlow.continueToScoringCriteria();
            await jobCreationFlow.generateScoringCriteria();
            await jobCreationFlow.publishScoring();
            await jobCreationFlow.goToCandidates();
        });
    }
});
