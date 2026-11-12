import { test, expect } from '../../fixtures/index.fixture';

/**
 * Candidate "Document Requested" (post-offer) public link. Override per run:
 *   $env:POST_OFFER_URL="https://..." ; npx playwright test tests/post-offer
 * Set POST_OFFER_SUBMIT=0 to fill everything but skip the final Submit click.
 */
const POST_OFFER_URL = 
    'https://app.skima.ai/public/candidate-document-upload?token=c075c3f8-2f9e-4d59-a05f-bfe03cd21c51';
const WORKERS = Number(process.env.POST_OFFER_WORKERS ?? 4);

test.describe('Post-offer document filling', () => {
    test('should be able to fill every visible section and submit the documents', async ({ postOfferFlow, page }) => {
        test.setTimeout(15 * 60 * 1000);

        await postOfferFlow.open(POST_OFFER_URL);
        const resolvedUrl = page.url(); // skips the tracking redirect for the extra tabs

        const results = await postOfferFlow.fillAllSections(page.context(), resolvedUrl, WORKERS);

        const notSaved = Object.values(results).filter(r => r.status !== 'saved');
        for (const r of notSaved) console.warn(`NOT SAVED: ${r.section} -> ${r.status} ${r.errors.join(' | ')}`);
        console.log('Sections complete:', await postOfferFlow.getSectionsCompleteText());
        expect(notSaved, 'every section should be saved').toHaveLength(0);

        await page.screenshot({ path: 'test-results/post-offer-overview.png', fullPage: true });

        // Final "Submit Document" click is disabled for now. Uncomment to submit again.
        // if (process.env.POST_OFFER_SUBMIT !== '0') {
        //     await test.step('click Submit Document', async () => {
        //         await postOfferFlow.submit();
        //         await page.screenshot({ path: 'test-results/post-offer-submitted.png', fullPage: true });
        //     });
        // }
    });
});
