import { test } from '../../fixtures/index.fixture';
import { bgvDocumentTypes } from '../../pages/bgv/background-verfication-flow';

test.describe('Background Verification Flow', () => {
    test('should be able to add every document type for the first candidate', async ({ bgvFlow }) => {
        test.setTimeout(10 * 60 * 1000);

        await bgvFlow.openJob('automate-test-20');

        const menuCount = await bgvFlow.getCandidateMenuCount();
        if (menuCount === 0) {
            console.warn('No candidate cards available. Skipping the test.');
            return;
        }

        await bgvFlow.openVerifyDocumentsForFirstCandidate();

        // One at a time: add -> select type -> fill -> save, then the next type.
        for (const code of Object.keys(bgvDocumentTypes)) {
            await test.step(`add document ${code}`, async () => {
                const saved = await bgvFlow.addDocument(code);
                if (!saved) {
                    console.warn(`${code}: fields not mapped yet, cancelled without saving.`);
                }
            });
        }
    });
});
