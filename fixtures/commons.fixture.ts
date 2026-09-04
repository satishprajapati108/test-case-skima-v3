import { test as base } from "./auth.fixture";
import { JobsFilterPage } from "../pages/jobs/jobs-filter.page";

/**
 * Extends the auth-aware `test` with a `jobFilterPage` fixture: navigates to
 * /jobs and hands back a ready `JobsFilterPage`, so specs don't repeat
 * `new JobsFilterPage(page)` + `page.goto('/jobs')` in every test.
 */
export const test = base.extend<{ jobFilterPage: JobsFilterPage }>({
  jobFilterPage: async ({ page }, use) => {
    await page.goto('/jobs');
    await use(new JobsFilterPage(page));
  },
});

export { expect } from "./auth.fixture";
