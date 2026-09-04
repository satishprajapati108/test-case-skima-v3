// return-types.ts

// =====================================================
// 1. FUNCTION WITH EXPLICIT RETURN TYPE
// =====================================================

function add(a: number, b: number): number {
  return a + b;
}

const result1 = add(10, 20);

console.log("1. add():", result1);

let var1 : 'a' | 'b' | 'c' = 'a';
// =====================================================
// 2. FUNCTION WITHOUT EXPLICIT RETURN TYPE
//    TypeScript INFERS the return type
// =====================================================

function subtract(a: number, b: number) {
  return a - b;
}

const result2 = subtract(20, 10);

console.log("2. subtract():", result2);


// =====================================================
// 3. FUNCTION RETURNING STRING
// =====================================================

function getName(): string {
  return "Satish";
}

console.log("3. getName():", getName());


// =====================================================
// 4. FUNCTION WITHOUT RETURN TYPE
//    TypeScript automatically understands: void
// =====================================================

function printMessage(message: string) {
  console.log("4. printMessage():", message);
}

printMessage("Hello TypeScript");


// =====================================================
// 5. EXPLICIT void
// =====================================================

function printMessage2(message: string): void {
  console.log("5. printMessage2():", message);
}

printMessage2("Hello again");


// =====================================================
// 6. ASYNC FUNCTION
//    async function automatically returns a Promise
// =====================================================

async function getUserName() {
  return "Satish";
}

const userName = await getUserName();

console.log("6. getUserName():", userName);


// =====================================================
// 7. ASYNC FUNCTION WITH EXPLICIT Promise<string>
// =====================================================

async function getUserName2(): Promise<string> {
  return "Satish";
}

const userName2 = await getUserName2();

console.log("7. getUserName2():", userName2);


// =====================================================
// 8. ASYNC FUNCTION WITH Promise<number>
// =====================================================

async function getSalary(): Promise<number> {
  return 300000;
}

const salary = await getSalary();

console.log("8. getSalary():", salary);


// =====================================================
// 9. ASYNC FUNCTION WITH NO RETURN
//    TypeScript understands Promise<void>
// =====================================================

async function login() {
  console.log("9. Logging in...");
}

await login();


// =====================================================
// 10. EXPLICIT Promise<void>
// =====================================================

async function logout(): Promise<void> {
  console.log("10. Logging out...");
}

await logout();


// =====================================================
// 11. YOUR EXAMPLE
// =====================================================

type AppConfig = {
  username: string;
  environment: string;
};

interface App11  {
  username: string;
  environment: string;
}

async function ensureManualSession(
  config: AppConfig
): Promise<string> {

  console.log("11. Username:", config.username);
  console.log("11. Environment:", config.environment);

  // Imagine Playwright creates this session file
  const sessionPath = "./sessions/manual-session.json";

  return sessionPath;
}


const config: AppConfig = {
  username: "satish",
  environment: "test"
};

const sessionPath = await ensureManualSession(config);

console.log("11. Session path:", sessionPath);


// =====================================================
// 12. SAME FUNCTION WITHOUT EXPLICIT RETURN TYPE
// =====================================================

async function ensureManualSession2(config: AppConfig) {

  console.log("12. Username:", config.username);

  const sessionPath = "./sessions/manual-session.json";

  return sessionPath;
}

const sessionPath2 = await ensureManualSession2(config);

console.log("12. Session path:", sessionPath2);


// =====================================================
// 13. FUNCTION RETURNING AN OBJECT
// =====================================================

function getUser() {
  return {
    name: "Satish",
    age: 25,
    role: "QA"
  };
}

const user = getUser();

console.log("13. User:", user);
console.log("13. User name:", user.name);


// =====================================================
// 14. EXPLICIT OBJECT RETURN TYPE
// =====================================================

function getUser2(): {
  name: string;
  age: number;
  role: string;
} {
  return {
    name: "Satish",
    age: 25,
    role: "QA"
  };
}

console.log("14. User:", getUser2());


// =====================================================
// 15. FUNCTION THAT ACCEPTS AND RETURNS A TYPE
// =====================================================

function double(number: number): number {
  return number * 2;
}

console.log("15. double():", double(10));


// =====================================================
// 16. FUNCTION WITH OPTIONAL PARAMETER
// =====================================================

function greet(name: string, age?: number): string {

  if (age !== undefined) {
    return `Hello ${name}, you are ${age} years old`;
  }

  return `Hello ${name}`;
}

console.log("16. greet():", greet("Satish"));
console.log("16. greet():", greet("Satish", 25));


// =====================================================
// 17. IMPORTANT: RETURN TYPE CAN CATCH ERRORS
// =====================================================

// This is CORRECT:

function getNumber(): number {
  return 100;
}

console.log("17. getNumber():", getNumber());


// If you uncomment this, TypeScript will show an error:
//
// function wrongFunction(): number {
//   return "Hello";
// }
//
// Error:
// Type 'string' is not assignable to type 'number'


// =====================================================
// 18. PROMISE EXPLANATION
// =====================================================

async function getData(): Promise<string> {
  return "Data received";
}

const dataPromise = getData();

console.log("18. getData() before await:", dataPromise);

const data = await dataPromise;

console.log("18. getData() after await:", data);


// =====================================================
// FINAL SUMMARY
// =====================================================

console.log("\n==============================");
console.log("SUMMARY");
console.log("==============================");

console.log(`
number:
function add(): number

string:
function getName(): string

nothing:
function login(): void

async string:
async function getName(): Promise<string>

async number:
async function getSalary(): Promise<number>

async nothing:
async function login(): Promise<void>

TypeScript can usually INFER these return types,
so writing them explicitly is optional in many cases.
`);

