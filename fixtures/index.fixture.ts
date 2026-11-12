import { test as base } from "./auth.fixture";
import { JobsFilterPage } from "../pages/jobs/jobs-filter.page";
import { JobsCreationFlow } from "../pages/jobs/job-creation.flow";
import { CandidateFilterPage } from "pages/candidates/candidate-filter.page";
import { BackgroundVerificationFlow } from "../pages/bgv/background-verfication-flow";
import { PostOfferDocsFlow } from "../pages/post-offer/post-offer-docs.flow";

/**
 * Extends the auth-aware `test` with a `jobFilterPage` fixture: navigates to
 * /jobs and hands back a ready `JobsFilterPage`, so specs don't repeat
 * `new JobsFilterPage(page)` + `page.goto('/jobs')` in every test.
 */
export const test = base.extend<{
  jobFilterPage: JobsFilterPage
  candidateFilterPage : CandidateFilterPage
  jobCreationFlow : JobsCreationFlow
  bgvFlow : BackgroundVerificationFlow
  postOfferFlow : PostOfferDocsFlow
}>({
  postOfferFlow : async({page}, use) =>{
    await use(new PostOfferDocsFlow(page));
  },
  bgvFlow : async({page}, use) =>{
    await page.goto('/jobs');
    await use(new BackgroundVerificationFlow(page));
  },
  jobFilterPage: async ({ page }, use) => {
    await page.goto('/jobs');
    await use(new JobsFilterPage(page));
  },
  candidateFilterPage : async({page}, use) =>{
    await page.goto('/candidates');
    await use(new CandidateFilterPage(page));
  },
  jobCreationFlow : async({page}, use) =>{
    await page.goto('/jobs');
    await use(new JobsCreationFlow(page));
  }
});

export { expect } from "./auth.fixture";
