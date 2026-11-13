/**
 * Realistic, per-run random test data for the post-offer form.
 * Every run gets fresh values (unique PAN / PF / UAN / Aadhaar, valid mobiles, sensible dates) so the app's
 * "already exists" checks pass, and dropdown / radio choices vary so different combinations get covered.
 * Re-run the exact same data with:  $env:POST_OFFER_SEED="123456"
 */
const FIRST_M = ['Rahul', 'Amit', 'Rohan', 'Sanjay', 'Vikram', 'Arjun', 'Karan', 'Nikhil', 'Suresh', 'Prakash'];
const FIRST_F = ['Priya', 'Sneha', 'Anita', 'Pooja', 'Neha', 'Kavita', 'Meera', 'Sunita', 'Rekha', 'Divya'];
const LAST = ['Sharma', 'Patil', 'Deshmukh', 'Verma', 'Iyer', 'Nair', 'Gupta', 'Kulkarni', 'Joshi', 'Reddy', 'Mehta', 'Singh'];
const CITIES: [string, string, string][] = [
    ['Pune', '411001', 'Baner'], ['Mumbai', '400001', 'Andheri'], ['Bengaluru', '560001', 'Indiranagar'],
    ['Hyderabad', '500001', 'Madhapur'], ['Chennai', '600001', 'Adyar'], ['Ahmedabad', '380001', 'Navrangpura'],
    ['Nagpur', '440001', 'Dharampeth'], ['Jaipur', '302001', 'Malviya Nagar'], ['Delhi', '110001', 'Saket'],
];
const COMPANIES = ['Infosys Ltd', 'Tata Consultancy Services', 'Wipro Technologies', 'Tech Mahindra', 'Capgemini India Pvt Ltd', 'Persistent Systems', 'Cognizant Technology Solutions', 'Zensar Technologies'];
const DESIGNATIONS = ['Software Engineer', 'Senior Executive', 'Team Lead', 'Business Analyst', 'HR Executive', 'QA Engineer', 'Project Coordinator'];
const COLLEGES = ['Savitribai Phule Pune University', 'Mumbai University', 'Anna University', 'Delhi University', 'Gujarat University', 'Osmania University'];
const RELATIONS = ['Brother', 'Sister', 'Uncle', 'Cousin', 'Friend', 'Colleague'];
const STREETS = ['MG Road', 'Station Road', 'Park Street', 'Lake View Road', 'Gandhi Nagar'];

/** Parent / child / spouse DOB bands, by relation word found in the label. */
const DOB_BY_RELATION: [RegExp, number, number][] = [
    [/mother|father|parent|guardian/, 1952, 1964],
    [/spouse|wife|husband|partner/, 1990, 1998],
    [/son|daughter|child|kid/, 2015, 2022],
    [/brother|sister|sibling/, 1988, 2000],
];

export class TestData {
    readonly seed: number;
    private state: number;
    readonly lastName: string;
    readonly firstName: string;
    readonly fullName: string;
    readonly city: [string, string, string];

    constructor(seed?: number) {
        this.seed = seed ?? (Number(process.env.POST_OFFER_SEED) || Date.now() % 1_000_000_000);
        this.state = this.seed;
        this.lastName = this.pick(LAST);
        this.firstName = this.pick(FIRST_M);
        this.fullName = `${this.firstName} ${this.pick(FIRST_M)} ${this.lastName}`;
        this.city = this.pick(CITIES);
        console.log(`[test-data] seed=${this.seed} (set POST_OFFER_SEED to repeat this run)`);
    }

    /** mulberry32 - small seeded RNG */
    rnd(): number {
        this.state = (this.state + 0x6d2b79f5) | 0;
        let t = this.state;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    int(min: number, max: number) { return min + Math.floor(this.rnd() * (max - min + 1)); }
    pick<T>(arr: readonly T[]): T { return arr[Math.floor(this.rnd() * arr.length)]; }
    digits(n: number, firstNonZero = true) {
        let s = '';
        for (let i = 0; i < n; i++) s += this.int(i === 0 && firstNonZero ? 1 : 0, 9);
        return s;
    }
    letters(n: number) { return Array.from({ length: n }, () => String.fromCharCode(65 + this.int(0, 25))).join(''); }
    date(y1: number, y2: number) {
        const m = String(this.int(1, 12)).padStart(2, '0');
        const d = String(this.int(1, 28)).padStart(2, '0');
        return `${this.int(y1, y2)}-${m}-${d}`;
    }

    mobile() { return this.pick(['6', '7', '8', '9']) + this.digits(9, false); } // never starts with 0-5
    pan() { return `${this.letters(3)}P${this.lastName[0].toUpperCase()}${this.digits(4, false)}${this.letters(1)}`; }

    /** Person name that matches the relation named in the label (mother -> female, father -> male). */
    personName(l: string) {
        if (/mother|wife|sister|daughter|spouse/.test(l)) return `${this.pick(FIRST_F)} ${this.lastName}`;
        if (/father|husband|brother|son\b/.test(l)) return `${this.pick(FIRST_M)} ${this.lastName}`;
        return `${this.pick([...FIRST_M, ...FIRST_F])} ${this.pick(LAST)}`;
    }

    /** Date for a date field, chosen so cross-field rules hold (parents older than employee, from < to, past vs future). */
    dateFor(label: string): string {
        const l = label.toLowerCase();
        if (/birth|dob/.test(l)) {
            const band = DOB_BY_RELATION.find(([re]) => re.test(l));
            return band ? this.date(band[1], band[2]) : this.date(1994, 1999);
        }
        if (/valid|expir/.test(l)) return this.date(2030, 2035); // future
        if (/\bto\b|end|till|relieving|leaving|last working/.test(l)) return this.date(2020, 2023); // past, after any "from"
        if (/joining|from|start|issue/.test(l)) return this.date(2016, 2019);
        return this.date(2018, 2022);
    }

    /** Text / number value for a field label. */
    valueFor(label: string, type: string): string {
        const l = label.toLowerCase();
        const numeric = type === 'number';
        if (/wage|amount|withdrawn/.test(l)) return String(this.int(15, 60) * 1000);
        if (type === 'email' || /e-?mail/.test(l)) return 'satish.prajapati@skima.ai';
        if (/landline/.test(l)) return `020${this.digits(8)}`;
        if (/mobile|phone|contact no|contact number/.test(l)) return this.mobile();
        if (/pan no|pan number/.test(l)) return this.pan();
        if (/aadhaar|aadhar/.test(l) && /name/.test(l)) return this.fullName;
        if (/aadhaar|aadhar/.test(l)) return this.pick(['2', '3', '4', '5', '6', '7', '8', '9']) + this.digits(11, false);
        if (/name as/.test(l)) return this.fullName;
        if (/name/.test(l) && /passport/.test(l)) return this.fullName;
        if (/passport/.test(l)) return this.letters(1) + this.digits(7);
        if (/\buan\b/.test(l)) return `100${this.digits(9, false)}`;
        if (/\bpf\b|provident/.test(l)) return numeric ? this.digits(10) : `MHPUN${this.digits(7)}`;
        if (/esic|esi no/.test(l)) return this.digits(17);
        if (/licen[cs]e|dl no/.test(l)) return `MH14${this.int(2012, 2020)}${this.digits(7, false)}`;
        if (/pin ?code|zip|postal/.test(l)) return this.city[1];
        if (/house|building|floor|address/.test(l)) return `Flat ${this.int(101, 905)}, ${this.pick(STREETS)}`;
        if (/area|locality|street/.test(l)) return this.city[2];
        if (/landmark/.test(l)) return `Near ${this.pick(['City Mall', 'Railway Station', 'Bus Stand', 'Central Park'])}`;
        if (/relationship|relation/.test(l)) return this.pick(RELATIONS);
        if (/designation|role|position/.test(l)) return this.pick(DESIGNATIONS);
        if (/college|institution|university|school/.test(l)) return this.pick(COLLEGES);
        if (/company|organi[sz]ation|employer/.test(l)) return this.pick(COMPANIES);
        if (/percent|cgpa|marks|grade|score/.test(l)) return String(this.int(60, 92));
        if (/year/.test(l)) return String(this.int(2012, 2022));
        if (/height/.test(l)) return String(this.int(160, 185));
        if (/weight/.test(l)) return String(this.int(55, 85));
        if (/power/.test(l)) return '0.5';
        if (/salary|ctc|income/.test(l)) return String(this.int(300, 1200) * 1000);
        if (/name/.test(l)) return this.personName(l);
        if (/city|town/.test(l)) return this.city[0];
        if (/number|no\b|no\./.test(l) || numeric) return this.digits(8);
        return 'General';
    }
}

/** One shared instance per process, so parallel tabs of one run use the same identity. */
export const testData = new TestData();
