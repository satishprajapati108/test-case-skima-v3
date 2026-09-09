import { test as base } from "./auth.fixture";
import { JobsFilterPage } from "../pages/jobs/jobs-filter.page";
import { CandidateFilterPage } from "pages/candidates/candidate-filter.page";

/**
 * Extends the auth-aware `test` with a `jobFilterPage` fixture: navigates to
 * /jobs and hands back a ready `JobsFilterPage`, so specs don't repeat
 * `new JobsFilterPage(page)` + `page.goto('/jobs')` in every test.
 */
export const test = base.extend<{ 
  jobFilterPage: JobsFilterPage 
  candidateFilterPage : CandidateFilterPage
}>({
  jobFilterPage: async ({ page }, use) => {
    await page.goto('/jobs');
    await use(new JobsFilterPage(page));
  },
  candidateFilterPage : async({page}, use) =>{
    await page.goto('/candidates');
    await use(new CandidateFilterPage(page));
  }
});

export { expect } from "./auth.fixture";
