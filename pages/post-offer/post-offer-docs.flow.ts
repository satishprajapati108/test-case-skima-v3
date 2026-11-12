import { chromium, Locator, Page, BrowserContext } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { BasePage } from '../base.page';

/** Result of filling one section card. */
export interface SectionResult {
    section: string;
    status: 'saved' | 'incomplete' | 'validation-errors' | 'failed';
    errors: string[];
}

const DOCS_DIR = path.resolve(__dirname, '../../fixtures/sample-docs');
const EMAIL = 'satish.prajapati@skima.ai';

/** Labels answered "No" (disclosures / negative questions); every other yes/no question gets "Yes". */
const NO_RADIO = /disabled|legal|case|member of|previously worked|currently hold|worked outside|relative|vendor|dependent/i;

export class PostOfferDocsFlow extends BasePage {
    constructor(page: Page) {
        super(page);
        // The repo config has no actionTimeout (= wait forever), so cap every step here or one bad locator hangs the run.
        page.setDefaultTimeout(6000);
        page.setDefaultNavigationTimeout(60000);
    }

    // Overview page
    readonly pageTitle = this.page.getByText('Document Requested');
    readonly sectionHeadings = this.page.locator('button h1, button h2, button h3, button h4, button h5, button h6');
    readonly submitDocumentButton = this.page.getByRole('button', { name: /submit document/i });
    readonly backToCategories = this.page.getByRole('button', { name: /back to categories/i });

    // Section form
    readonly form = this.page.locator('form').first();
    readonly saveAndContinue = this.page.getByRole('button', { name: /save & continue/i }).first();
    readonly addMoreButton = this.page.getByRole('button', { name: /add more/i }).first();
    readonly noneAddedYet = this.page.getByText('None added yet');
    readonly dialog = this.page.locator('.ant-modal-content, .ant-drawer-content, [role=dialog]').last();
    readonly formErrors = this.page.locator('form .text-red-600:not(:has(*)), form .ant-form-item-explain-error');

    // Sample documents
    /** Generates a photo + a PDF once, so every upload field has something valid to attach. */
    async ensureSampleDocs() {
        if (fs.existsSync(path.join(DOCS_DIR, 'sample.pdf')) && fs.existsSync(path.join(DOCS_DIR, 'photo.jpg'))) return;
        fs.mkdirSync(DOCS_DIR, { recursive: true });
        const p = await this.page.context().newPage();
        await p.setViewportSize({ width: 400, height: 500 });
        await p.setContent(`<body style="margin:0;display:grid;place-items:center;height:100vh;background:#cfe3ff;font:bold 28px sans-serif">
            <div style="text-align:center"><div style="width:180px;height:180px;border-radius:50%;background:#4a7bd6;margin:auto"></div><p>TEST PHOTO</p></div></body>`);
        await p.screenshot({ path: path.join(DOCS_DIR, 'photo.png') });
        await p.screenshot({ path: path.join(DOCS_DIR, 'photo.jpg'), type: 'jpeg' });
        await p.setContent('<body style="font:20px sans-serif;padding:40px"><h1>SAMPLE TEST DOCUMENT</h1><p>Generated for automated form testing. Not a real document.</p></body>');
        await p.pdf({ path: path.join(DOCS_DIR, 'sample.pdf'), format: 'A4' });
        await p.close();
    }

    /** Picks a sample file the field accepts (read from its `accept` attribute): photos prefer JPG, everything else PDF. */
    private fileFor(label: string, accept: string) {
        const ok = (ext: string) => !accept || accept.toLowerCase().includes(ext);
        const photo = /photo|image|picture/i.test(label);
        if (photo) {
            if (ok('jpg') || ok('jpeg')) return path.join(DOCS_DIR, 'photo.jpg');
            if (ok('png')) return path.join(DOCS_DIR, 'photo.png');
        }
        if (ok('pdf')) return path.join(DOCS_DIR, 'sample.pdf');
        if (ok('jpg') || ok('jpeg')) return path.join(DOCS_DIR, 'photo.jpg');
        return path.join(DOCS_DIR, 'photo.png');
    }

    // Overview
    async open(url: string) {
        await this.page.goto(url);
        await this.pageTitle.waitFor({ state: 'visible', timeout: 60000 });
    }

    /** Sections shown on the page right now - varies per candidate, so it is always read live. */
    async getVisibleSections(): Promise<string[]> {
        await this.openList();
        await this.page.waitForTimeout(800);
        const names = (await this.sectionHeadings.allTextContents()).map(t => t.trim()).filter(t => t && t !== 'Document Requested');
        return [...new Set(names)];
    }

    async openList() {
        if (!(await this.pageTitle.count())) {
            await this.backToCategories.click().catch(() => { });
        }
        await this.pageTitle.waitFor({ state: 'visible', timeout: 60000 });
    }

    async getSectionsCompleteText(): Promise<string> {
        return (await this.page.locator('text=/^\\d+\\/\\d+$/').first().innerText().catch(() => '?')).trim();
    }

    // Value rules
    private valueFor(label: string, type: string): string {
        const l = label.toLowerCase();
        if (/wage|amount|withdrawn/.test(l)) return '15000';
        if (type === 'email' || /e-?mail/.test(l)) return EMAIL;
        if (/landline/.test(l)) return '02012345678';
        if (/mobile|phone|contact no|contact number/.test(l)) return '9876543210';
        if (/pan no|pan number/.test(l)) return 'ABCDE1234F';
        if (/aadhaar|aadhar/.test(l) && /name/.test(l)) return 'Satish Prem Prajapati';
        if (/aadhaar|aadhar/.test(l)) return '234567890124';
        if (/name as/.test(l)) return 'Satish Prem Prajapati';
        if (/name/.test(l) && /passport/.test(l)) return 'Satish Prem Prajapati';
        if (/passport/.test(l)) return 'A1234567';
        if (/uan/.test(l)) return '100123456789';
        if (/licen[cs]e|dl no/.test(l)) return 'MH1420110062821';
        if (/pin ?code|zip|postal/.test(l)) return '411001';
        if (/house|building|floor|address/.test(l)) return 'Flat 101, Test Residency';
        if (/area|locality|street/.test(l)) return 'Baner';
        if (/landmark/.test(l)) return 'Near Test Mall';
        if (/relationship|relation/.test(l)) return 'Brother';
        if (/designation|role|position/.test(l)) return 'Manager';
        if (/company|college|organi[sz]ation|employer|institution|university|school/.test(l)) return 'Test Corp Pvt Ltd';
        if (/percent|cgpa|marks|grade|score/.test(l)) return '85';
        if (/year/.test(l)) return '2020';
        if (/height/.test(l)) return '175';
        if (/weight/.test(l)) return '70';
        if (/power/.test(l)) return '0.5';
        if (/salary|ctc|income/.test(l)) return '500000';
        if (/name/.test(l)) return 'Test Person';
        if (/city|town/.test(l)) return 'Pune';
        if (/number|no\b|no\./.test(l) || type === 'number') return '12345';
        return 'Test';
    }

    // Generic field filler
    private async pickSelect(group: Locator): Promise<boolean> {
        if (await group.locator('.ant-select-selection-item').count()) return false;
        const selector = group.locator('.ant-select-selector').first();
        if (!(await selector.count())) return false;
        await selector.click({ timeout: 3000 }).catch(() => { });
        const option = this.page
            .locator('.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item-option:not(.ant-select-item-option-disabled)')
            .first();
        try {
            await option.waitFor({ timeout: 3000 });
        } catch {
            await this.page.keyboard.press('Escape');
            return false;
        }
        // Keyboard pick is more reliable than clicking the option (no viewport / overlay issues).
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        if (!(await group.locator('.ant-select-selection-item').count())) {
            await option.click({ timeout: 3000, force: true }).catch(() => { });
        }
        await this.page.keyboard.press('Escape');
        return !!(await group.locator('.ant-select-selection-item').count());
    }

    private async pickRadio(group: Locator, label: string): Promise<boolean> {
        const radios = group.locator('input[type=radio]');
        const count = await radios.count();
        if (!count) return false;
        for (let i = 0; i < count; i++) if (await radios.nth(i).isChecked()) return false;
        const texts: string[] = [];
        for (let i = 0; i < count; i++) {
            texts.push((await radios.nth(i).evaluate((e: any) => (e.closest('label') as any)?.innerText || e.parentElement?.parentElement?.innerText || '')).trim());
        }
        const wantNo = NO_RADIO.test(label);
        let idx = texts.findIndex(t => /fresher/i.test(t));
        if (idx < 0) idx = texts.findIndex(t => /father/i.test(t));
        if (idx < 0) idx = texts.findIndex(t => (wantNo ? /^no/i : /^yes/i).test(t));
        if (idx < 0) idx = 0;
        await radios.nth(idx).evaluate((e: any) => ((e.closest('label') as any) ?? e).click());
        return true;
    }

    private async fillGroups(root: Locator, filled: Map<string, number>): Promise<number> {
        const seen = new Map<string, number>();
        const groups = root.locator('div.group');
        const total = await groups.count();
        let changed = 0;
        for (let i = 0; i < total; i++) {
            const group = groups.nth(i);
            if (!(await group.isVisible().catch(() => false))) continue;
            if (await group.locator('div.group').count()) continue; // nested container
            await group.scrollIntoViewIfNeeded().catch(() => { });
            const label = ((await group.locator('label').first().innerText().catch(() => '')) || '').replace(/\*/g, '').trim();
            // key = label + nth occurrence (stable even when new fields appear above); each field is attempted a bounded number of times
            const nth = (seen.get(label) ?? 0) + 1;
            seen.set(label, nth);
            const key = `${label}~${nth}`;
            const tried = filled.get(key) ?? 0;
            const isChoice = (await group.locator('.ant-select, input[type=radio], input[type=checkbox]').count()) > 0;
            if (tried >= (isChoice ? 2 : 1)) continue;
            filled.set(key, tried + 1);
            try {
                const fileInput = group.locator('input[type=file]');
                if (await fileInput.count()) {
                    {
                        // already holds a file (earlier upload / HR-provided): leave it alone
                        if (await group.getByText(/Files selected:\s*[1-9]/).count()) continue;
                        const file = this.fileFor(label, (await fileInput.first().getAttribute('accept')) || '');
                        await fileInput.first().setInputFiles(file);
                        // wait until the uploaded file name shows up, so Save is never clicked mid-upload
                        const shown = await group.getByText(path.basename(file)).first().waitFor({ timeout: 6000 }).then(() => true, () => false);
                        if (!shown) console.warn(`  ! ${label}: upload not confirmed on screen`);
                        await this.page.waitForTimeout(shown ? 500 : 2500);
                        changed++;
                    }
                    continue;
                }
                if (await group.locator('.ant-select').count()) { if (await this.pickSelect(group)) changed++; continue; }
                if (await group.locator('input[type=radio]').count()) { if (await this.pickRadio(group, label)) changed++; continue; }
                const checkbox = group.locator('input[type=checkbox]');
                if (await checkbox.count()) {
                    if (!(await checkbox.first().isChecked())) {
                        await checkbox.first().evaluate((e: any) => ((e.closest('label') as any) ?? e).click());
                        changed++;
                    }
                    continue;
                }
                const input = group.locator('textarea, input:not([type=hidden]):not([type=search]):not([type=file])').first();
                if (!(await input.count())) continue;
                const current = await input.inputValue();
                const looksWrong = ['Test', 'Test Corp Pvt Ltd'].includes(current)
                    || (/name/i.test(label) && /passport/i.test(label) && current === 'A1234567');
                if (current && !looksWrong) continue;
                const placeholder = (await input.getAttribute('placeholder')) || '';
                const type = (await input.getAttribute('type')) || 'text';
                if (/date/i.test(placeholder) || /\bdate\b/i.test(label)) {
                    await input.click();
                    await input.fill(/valid|expir|till|\bto\b/i.test(label) ? '2032-01-15' : '2020-01-15');
                    await this.page.keyboard.press('Enter');
                    await this.page.keyboard.press('Escape');
                } else {
                    await input.fill(this.valueFor(label, type));
                }
                changed++;
            } catch (e) {
                console.warn(`  ! ${label}: ${(e as Error).message.split('\n')[0]}`);
            }
        }
        return changed;
    }

    /** Keeps filling until nothing changes - answering "Yes" reveals more fields. */
    private async fillUntilStable(root: Locator, filled = new Map<string, number>()) {
        for (let pass = 0; pass < 4; pass++) {
            if (!(await this.fillGroups(root, filled))) break;
            await this.page.waitForTimeout(300);
        }
    }

    /** "Add more" sections (education, skills, employers...) - fill one entry in the dialog. */
    private async addRepeaterEntry() {
        if (!(await this.addMoreButton.count()) || !(await this.addMoreButton.isVisible())) return;
        if (!(await this.noneAddedYet.count())) return; // already has an entry
        await this.addMoreButton.click();
        try {
            await this.dialog.waitFor({ timeout: 4000 });
        } catch {
            console.warn('  ! no dialog after Add more');
            return;
        }
        await this.fillUntilStable(this.dialog);
        await this.dialog.locator('button[type=submit], button:has-text("Save"), button:has-text("Add"), button:has-text("Done")').last().click();
        await this.page.waitForTimeout(1500);
        if (await this.dialog.isVisible().catch(() => false)) await this.page.keyboard.press('Escape');
    }

    // One section
    /**
     * One reload, then read every card: a completed card shows a green tick (a second svg next to the icon).
     * This is the source of truth for what still needs filling - the overview keeps stale counts until reloaded.
     */
    async getSectionStatus(): Promise<Record<string, boolean>> {
        await this.page.reload();
        await this.pageTitle.waitFor({ state: 'visible', timeout: 60000 });
        await this.page.waitForTimeout(1200);
        const cards = await this.page.locator('button').filter({ has: this.page.locator('h1, h2, h3, h4, h5, h6') }).all();
        const status: Record<string, boolean> = {};
        for (const card of cards) {
            const name = (await card.locator('h1,h2,h3,h4,h5,h6').first().textContent().catch(() => ''))?.trim();
            if (name) status[name] = (await card.locator('svg').count()) >= 2;
        }
        return status;
    }

    async fillSection(title: string): Promise<SectionResult> {
        const cap = new Promise<SectionResult>(res =>
            setTimeout(() => res({ section: title, status: 'failed', errors: ['section timed out after 180s'] }), 180000));
        return Promise.race([this.fillSectionInner(title), cap]);
    }

    private async fillSectionInner(title: string): Promise<SectionResult> {
        console.log(`> ${title}`);
        try {
            await this.openList();
            await this.page.getByRole('heading', { name: title, exact: true }).first().click();
            await this.form.waitFor({ timeout: 15000 });
            await this.page.waitForTimeout(800);
            const filled = new Map<string, number>();
            await this.fillUntilStable(this.form, filled);
            await this.addRepeaterEntry();
            await this.fillUntilStable(this.form, filled);
            await this.saveAndContinue.click();
            // Saving uploads files and can take a while: wait for the "Saving" state to end, never a fixed delay.
            await this.page.getByRole('button', { name: /saving/i }).waitFor({ state: 'attached', timeout: 3000 }).catch(() => { });
            await this.page.getByRole('button', { name: /saving/i }).waitFor({ state: 'detached', timeout: 90000 }).catch(() => { });
            await this.page.waitForTimeout(1500);
            const errors = (await this.formErrors.allInnerTexts().catch(() => [])).map(s => s.trim()).filter(s => s && s !== '*');
            if (await this.page.getByText(/fill out all required fields/i).first().isVisible().catch(() => false)) {
                errors.push('required fields missing (toast shown)');
            }
            if (errors.length) return { section: title, status: 'validation-errors', errors };
            return { section: title, status: 'saved', errors: [] };
        } catch (e) {
            return { section: title, status: 'failed', errors: [(e as Error).message.split('\n')[0]] };
        }
    }

    // All sections, in parallel
    /**
     * Fills every section visible right now, using `workers` parallel tabs.
     * Re-scans after each round (sections can appear after saving) and retries failures, up to `maxRounds`.
     */
    async fillAllSections(context: BrowserContext, url: string, workers = 5, maxRounds = 4): Promise<Record<string, SectionResult>> {
        await this.ensureSampleDocs();
        const last: Record<string, SectionResult> = {};
        let status = await this.getSectionStatus();
        for (let round = 1; round <= maxRounds; round++) {
            const pending = Object.keys(status).filter(s => !status[s]);
            console.log(`Round ${round}: ${Object.keys(status).length} sections visible, ${pending.length} incomplete`);
            if (!pending.length) break; // everything verified on the page -> go straight to submit
            const queue = [...pending];
            const run = async (flow: PostOfferDocsFlow) => {
                while (queue.length) {
                    const s = queue.shift()!;
                    const r = await flow.fillSection(s);
                    last[s] = r;
                    console.log(`${r.status === 'saved' ? '✓' : '✗'} ${s} [${r.status}] ${r.errors.slice(0, 3).join(' | ')}`);
                    if (r.status === 'failed') await flow.page.goto(url).catch(() => { });
                }
            };
            // Extra workers run in a separate headless browser: many headed tabs in one window crash Chromium.
            const roundWorkers = round >= 3 ? 1 : Math.min(workers, pending.length); // retries run one at a time
            const headless = roundWorkers > 1 ? await chromium.launch({ headless: true }) : null;
            const extra = await Promise.all(
                Array.from({ length: roundWorkers - 1 }, async () => {
                    const p: Page = await (await headless!.newContext()).newPage();
                    await p.goto(url);
                    return new PostOfferDocsFlow(p);
                }),
            );
            await Promise.all([run(this), ...extra.map(run)]);
            await headless?.close();
            status = await this.getSectionStatus(); // single reload per round, not per section
        }
        const results: Record<string, SectionResult> = {};
        for (const [name, done] of Object.entries(status)) {
            results[name] = done
                ? { section: name, status: 'saved', errors: [] }
                : { section: name, status: 'incomplete', errors: last[name]?.errors ?? ['card has no completion tick'] };
        }
        return results;
    }

    // Submit
    /** Clicks "Submit Document" and confirms any confirmation dialog. Irreversible: HR takes over after this. */
    async submit() {
        await this.page.goto(this.page.url());
        await this.pageTitle.waitFor({ state: 'visible', timeout: 60000 });
        await this.submitDocumentButton.click();
        const confirm = this.page.locator('.ant-modal-content, [role=dialog], [role=alertdialog]')
            .getByRole('button', { name: /^(submit|confirm|yes|ok|proceed)/i }).last();
        if (await confirm.isVisible({ timeout: 4000 }).catch(() => false)) await confirm.click();
        await this.page.waitForTimeout(3000);
    }
}
