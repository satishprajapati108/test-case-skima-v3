// ============================================================
// TYPESCRIPT - REMAINING IMPORTANT CONCEPTS
// ============================================================
//
// You already covered:
//
// ✅ String
// ✅ String methods
// ✅ Arrays
// ✅ Array methods
// ✅ Loops
//
// This file covers:
//
// 1. Objects
// 2. Object methods
// 3. Functions
// 4. Optional parameters
// 5. Default parameters
// 6. Rest parameters
// 7. Type aliases
// 8. Interfaces
// 9. Union types
// 10. Literal types
// 11. Type narrowing
// 12. Enums
// 13. Tuples
// 14. any
// 15. unknown
// 16. null / undefined
// 17. Optional properties
// 18. readonly
// 19. Type assertions
// 20. Generics
// 21. Generic functions
// 22. Generic interfaces
// 23. Classes
// 24. Constructor
// 25. public/private/protected
// 26. extends
// 27. implements
// 28. abstract class
// 29. async/await
// 30. Promise
// 31. try/catch
// 32. Error handling
// 33. Modules
// 34. import/export
// 35. nullish coalescing
// 36. optional chaining
// 37. ternary operator
// 38. type guards
// 39. keyof
// 40. Record
// 41. Pick
// 42. Omit
// 43. Partial
// 44. ReturnType
// 45. typeof
//
// ============================================================



// ============================================================
// 1. OBJECTS
// ============================================================

console.log("\n1. OBJECTS");

const user = {
  name: "Satish",
  age: 25,
  role: "QA"
};

console.log(user);
console.log(user.name);
console.log(user.role);


// ============================================================
// 2. MODIFY OBJECT
// ============================================================

console.log("\n2. MODIFY OBJECT");

user.age = 26;

console.log(user);


// ============================================================
// 3. ADD OBJECT PROPERTY
// ============================================================

const employee: {
  name: string;
  role: string;
  salary: number;
} = {
  name: "Satish",
  role: "QA",
  salary: 300000
};

console.log("\n3. Employee:", employee);


// ============================================================
// 4. OBJECT ARRAY
// ============================================================

console.log("\n4. OBJECT ARRAY");

const candidates: {
  name: string;
  score: number;
}[] = [
  {
    name: "Satish",
    score: 90
  },
  {
    name: "Rahul",
    score: 75
  }
];

console.log(candidates[0].name);
console.log(candidates[0].score);


// ============================================================
// 5. FUNCTION
// ============================================================

console.log("\n5. FUNCTION");

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(10, 20));


// ============================================================
// 6. FUNCTION RETURN TYPE INFERENCE
// ============================================================

function multiply(a: number, b: number) {
  return a * b;
}

console.log(
  "\n6. Multiply:",
  multiply(5, 10)
);


// TypeScript automatically knows:
//
// number


// ============================================================
// 7. OPTIONAL PARAMETER
// ============================================================

console.log("\n7. OPTIONAL PARAMETER");

function greet(name?: string) {

  if (name) {
    return `Hello ${name}`;
  }

  return "Hello Guest";
}

console.log(greet());
console.log(greet("Satish"));


// ============================================================
// 8. DEFAULT PARAMETER
// ============================================================

console.log("\n8. DEFAULT PARAMETER");

function welcome(
  name: string = "Guest"
) {
  return `Welcome ${name}`;
}

console.log(welcome());
console.log(welcome("Satish"));


// ============================================================
// 9. REST PARAMETER
// ============================================================

console.log("\n9. REST PARAMETER");

function sum(
  ...numbers: number[]
): number {

  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}

console.log(sum(10, 20));
console.log(sum(10, 20, 30, 40));


// ============================================================
// 10. TYPE ALIAS
// ============================================================

console.log("\n10. TYPE ALIAS");

type User = {
  name: string;
  age: number;
  role: string;
};

const user1: User = {
  name: "Satish",
  age: 25,
  role: "QA"
};

console.log(user1);


// ============================================================
// 11. TYPE ALIAS - REUSE
// ============================================================

const user2: User = {
  name: "Rahul",
  age: 30,
  role: "Developer"
};

console.log(user2);


// ============================================================
// 12. INTERFACE
// ============================================================

console.log("\n12. INTERFACE");

interface Employee {
  name: string;
  role: string;
  salary: number;
}

const employee1: Employee = {
  name: "Satish",
  role: "QA",
  salary: 300000
};

console.log(employee1);


// ============================================================
// 13. OPTIONAL PROPERTY
// ============================================================

console.log("\n13. OPTIONAL PROPERTY");

interface Candidate {
  name: string;
  email?: string;
}

const candidate1: Candidate = {
  name: "Satish"
};

const candidate2: Candidate = {
  name: "Rahul",
  email: "rahul@example.com"
};

console.log(candidate1);
console.log(candidate2);


// ============================================================
// 14. READONLY
// ============================================================

console.log("\n14. READONLY");

interface Config {
  readonly baseURL: string;
}

const config: Config = {
  baseURL: "https://example.com"
};

console.log(config.baseURL);


// This would produce an error:
//
// config.baseURL = "https://google.com";


// ============================================================
// 15. UNION TYPE
// ============================================================

console.log("\n15. UNION TYPE");

let status: string | number;

status = "Approved";

console.log(status);

status = 200;

console.log(status);


// ============================================================
// 16. UNION WITH LITERAL VALUES
// ============================================================

console.log("\n16. LITERAL TYPE");

let jobStatus:
  | "draft"
  | "published"
  | "closed";

jobStatus = "draft";

console.log(jobStatus);


// This is NOT allowed:
//
// jobStatus = "random";


// ============================================================
// 17. TYPE NARROWING
// ============================================================

console.log("\n17. TYPE NARROWING");

function printValue(
  value: string | number
) {

  if (typeof value === "string") {

    console.log(
      "String:",
      value.toUpperCase()
    );

  } else {

    console.log(
      "Number:",
      value.toFixed(2)
    );

  }
}

printValue("hello");
printValue(100);


// ============================================================
// 18. TUPLE
// ============================================================

console.log("\n18. TUPLE");

const person: [
  string,
  number,
  string
] = [
  "Satish",
  25,
  "QA"
];

console.log(person);


// Position matters:
//
// string
// number
// string


// ============================================================
// 19. ANY
// ============================================================

console.log("\n19. ANY");

let data: any = "Hello";

console.log(data);

data = 100;

console.log(data);

data = true;

console.log(data);


// any disables much of TypeScript's type checking.
//
// Avoid using any unless necessary.


// ============================================================
// 20. UNKNOWN
// ============================================================

console.log("\n20. UNKNOWN");

let unknownData: unknown = "Hello";

if (typeof unknownData === "string") {

  console.log(
    unknownData.toUpperCase()
  );

}


// unknown is safer than any.
//
// You must check the type before using it.


// ============================================================
// 21. NULL
// ============================================================

console.log("\n21. NULL");

let selectedUser: string | null = null;

console.log(selectedUser);

selectedUser = "Satish";

console.log(selectedUser);


// ============================================================
// 22. UNDEFINED
// ============================================================

console.log("\n22. UNDEFINED");

let value: string | undefined;

console.log(value);

value = "Hello";

console.log(value);


// ============================================================
// 23. OPTIONAL CHAINING
// ============================================================

console.log("\n23. OPTIONAL CHAINING");

const candidateData = {
  name: "Satish",
  address: {
    city: "Mumbai"
  }
};

console.log(
  candidateData.address?.city
);


// If address doesn't exist:
//
// undefined
//
// instead of an error.


// ============================================================
// 24. NULLISH COALESCING
// ============================================================

console.log("\n24. NULLISH COALESCING");

const candidateName =
  null ?? "Guest";

console.log(candidateName);


// If left side is null/undefined,
// use right side.


// ============================================================
// 25. TERNARY OPERATOR
// ============================================================

console.log("\n25. TERNARY");

const age = 25;

const result =
  age >= 18
    ? "Adult"
    : "Minor";

console.log(result);


// Equivalent to:
//
// if (age >= 18) {
//   result = "Adult";
// } else {
//   result = "Minor";
// }


// ============================================================
// 26. TYPE ASSERTION
// ============================================================

console.log("\n26. TYPE ASSERTION");

const someValue: unknown = "Hello";

const text =
  someValue as string;

console.log(
  text.toUpperCase()
);


// You are telling TypeScript:
//
// "I know this is a string."


// ============================================================
// 27. GENERIC FUNCTION
// ============================================================

console.log("\n27. GENERICS");

function identity<T>(
  value: T
): T {

  return value;
}

console.log(
  identity<string>("Hello")
);

console.log(
  identity<number>(100)
);


// T means:
//
// Type


// ============================================================
// 28. GENERIC WITH ARRAY
// ============================================================

function getFirst<T>(
  items: T[]
): T {

  return items[0];
}

console.log(
  getFirst<string>([
    "A",
    "B"
  ])
);

console.log(
  getFirst<number>([
    10,
    20
  ])
);


// ============================================================
// 29. GENERIC INTERFACE
// ============================================================

console.log("\n29. GENERIC INTERFACE");

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const response: ApiResponse<string> = {
  success: true,
  data: "Candidate created"
};

console.log(response);


// ============================================================
// 30. GENERIC API RESPONSE
// ============================================================

interface CandidateResponse {
  id: number;
  name: string;
}

const apiResponse:
  ApiResponse<CandidateResponse> = {

  success: true,

  data: {
    id: 101,
    name: "Satish"
  }

};

console.log(apiResponse.data.name);


// ============================================================
// 31. CLASS
// ============================================================

console.log("\n31. CLASS");

class Person {

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello(): string {
    return `Hello ${this.name}`;
  }

}

const person1 =
  new Person("Satish");

console.log(
  person1.sayHello()
);


// ============================================================
// 32. CLASS WITH MULTIPLE PROPERTIES
// ============================================================

class EmployeeClass {

  name: string;
  role: string;

  constructor(
    name: string,
    role: string
  ) {

    this.name = name;
    this.role = role;

  }

  getDetails(): string {

    return `${this.name} - ${this.role}`;

  }

}

const employeeClass =
  new EmployeeClass(
    "Satish",
    "QA"
  );

console.log(
  employeeClass.getDetails()
);


// ============================================================
// 33. PUBLIC / PRIVATE
// ============================================================

console.log("\n33. PUBLIC / PRIVATE");

class Account {

  public username: string;

  private password: string;

  constructor(
    username: string,
    password: string
  ) {

    this.username = username;
    this.password = password;

  }

  login(): boolean {

    return this.password === "12345";

  }

}

const account =
  new Account(
    "satish",
    "12345"
  );

console.log(
  account.username
);

console.log(
  account.login()
);


// This is NOT allowed:
//
// account.password


// ============================================================
// 34. PROTECTED
// ============================================================

console.log("\n34. PROTECTED");

class Parent {

  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

}

class Child extends Parent {

  printName() {

    console.log(
      this.name
    );

  }

}

const child =
  new Child("Satish");

child.printName();


// protected:
// Parent + Child can access it.
// Outside code cannot directly access it.


// ============================================================
// 35. INHERITANCE
// ============================================================

console.log("\n35. INHERITANCE");

class Animal {

  move() {
    console.log(
      "Animal is moving"
    );
  }

}

class Dog extends Animal {

  bark() {
    console.log(
      "Dog is barking"
    );
  }

}

const dog =
  new Dog();

dog.move();
dog.bark();


// ============================================================
// 36. IMPLEMENTS
// ============================================================

console.log("\n36. IMPLEMENTS");

interface LoginPage {

  login(
    username: string,
    password: string
  ): boolean;

}

class LoginPageImpl
  implements LoginPage {

  login(
    username: string,
    password: string
  ): boolean {

    return (
      username === "admin" &&
      password === "12345"
    );

  }

}

const loginPage =
  new LoginPageImpl();

console.log(
  loginPage.login(
    "admin",
    "12345"
  )
);


// ============================================================
// 37. ABSTRACT CLASS
// ============================================================

console.log("\n37. ABSTRACT CLASS");

abstract class BasePage {

  abstract getPageName(): string;

  open() {
    console.log(
      "Opening page"
    );
  }

}

class HomePage
  extends BasePage {

  getPageName(): string {
    return "Home Page";
  }

}

const homePage =
  new HomePage();

homePage.open();

console.log(
  homePage.getPageName()
);


// ============================================================
// 38. ASYNC / AWAIT
// ============================================================

console.log("\n38. ASYNC / AWAIT");

async function getUserData(): Promise<string> {

  return "Satish";

}

const userData =
  await getUserData();

console.log(userData);


// ============================================================
// 39. PROMISE
// ============================================================

console.log("\n39. PROMISE");

function fetchData(): Promise<string> {

  return new Promise(
    (resolve) => {

      setTimeout(() => {

        resolve(
          "Data received"
        );

      }, 500);

    }
  );

}

const fetchedData =
  await fetchData();

console.log(
  fetchedData
);


// ============================================================
// 40. TRY / CATCH
// ============================================================

console.log("\n40. TRY / CATCH");

try {

  const number =
    JSON.parse("invalid json");

  console.log(number);

} catch (error) {

  console.log(
    "Something went wrong"
  );

}


// ============================================================
// 41. THROW ERROR
// ============================================================

function validateAge(
  age: number
) {

  if (age < 18) {

    throw new Error(
      "Age must be 18 or above"
    );

  }

  return true;

}

try {

  validateAge(15);

} catch (error) {

  console.log(
    "Validation error:",
    error
  );

}


// ============================================================
// 42. FINALLY
// ============================================================

try {

  console.log(
    "Trying..."
  );

} catch (error) {

  console.log(
    "Error"
  );

} finally {

  console.log(
    "Always executes"
  );

}


// ============================================================
// 43. MODULE EXPORT
// ============================================================

// In another file:
//
// export function add() {
//   return 10;
// }
//
// Then:
//
// import { add } from "./math";
//
// console.log(add());


// ============================================================
// 44. TYPE EXPORT
// ============================================================

// Example:
//
// export type User = {
//   name: string;
//   age: number;
// };
//
// Then:
//
// import { User } from "./types";


// ============================================================
// 45. keyof
// ============================================================

console.log("\n45. KEYOF");

interface UserInfo {

  name: string;
  age: number;
  role: string;

}

type UserKey =
  keyof UserInfo;

const key: UserKey = "name";

console.log(key);


// Allowed:
//
// "name"
// "age"
// "role"


// ============================================================
// 46. RECORD
// ============================================================

console.log("\n46. RECORD");

const usersById:
  Record<number, string> = {

  101: "Satish",
  102: "Rahul",
  103: "Amit"

};

console.log(
  usersById[101]
);


// ============================================================
// 47. PARTIAL
// ============================================================

console.log("\n47. PARTIAL");

interface UserProfile {

  name: string;
  age: number;
  role: string;

}

const updateUser:
  Partial<UserProfile> = {

  role: "Senior QA"

};

console.log(updateUser);


// Partial makes all properties optional.


// ============================================================
// 48. PICK
// ============================================================

console.log("\n48. PICK");

type UserBasic =
  Pick<
    UserProfile,
    "name" | "role"
  >;

const basicUser:
  UserBasic = {

  name: "Satish",
  role: "QA"

};

console.log(basicUser);


// ============================================================
// 49. OMIT
// ============================================================

console.log("\n49. OMIT");

type UserWithoutAge =
  Omit<
    UserProfile,
    "age"
  >;

const userWithoutAge:
  UserWithoutAge = {

  name: "Satish",
  role: "QA"

};

console.log(
  userWithoutAge
);


// ============================================================
// 50. RETURN TYPE
// ============================================================

function createUser() {

  return {
    name: "Satish",
    role: "QA"
  };

}

type CreatedUser =
  ReturnType<
    typeof createUser
  >;

const newUser:
  CreatedUser = {

  name: "Rahul",
  role: "Developer"

};

console.log(newUser);


// ============================================================
// 51. TYPEOF
// ============================================================

const browser =
  "chromium";

type Browser =
  typeof browser;

const selectedBrowser:
  Browser = "chromium";

console.log(
  selectedBrowser
);


// ============================================================
// 52. FUNCTION TYPE
// ============================================================

console.log("\n52. FUNCTION TYPE");

type Calculator =
  (
    a: number,
    b: number
  ) => number;

const addNumbers:
  Calculator = (
    a,
    b
  ) => {

  return a + b;

};

console.log(
  addNumbers(10, 20)
);


// ============================================================
// 53. TYPE GUARD
// ============================================================

console.log("\n53. TYPE GUARD");

function processValue(
  value: string | number
) {

  if (
    typeof value === "string"
  ) {

    console.log(
      value.toUpperCase()
    );

    return;

  }

  console.log(
    value.toFixed(2)
  );

}

processValue("hello");
processValue(100);


// ============================================================
// 54. IN OPERATOR
// ============================================================

console.log("\n54. IN OPERATOR");

interface Admin {
  name: string;
  permissions: string[];
}

interface NormalUser {
  name: string;
  department: string;
}

function checkUser(
  user: Admin | NormalUser
) {

  if ("permissions" in user) {

    console.log(
      "Admin:",
      user.permissions
    );

  } else {

    console.log(
      "Department:",
      user.department
    );

  }

}

checkUser({
  name: "Satish",
  permissions: [
    "create",
    "delete"
  ]
});

checkUser({
  name: "Rahul",
  department: "QA"
});


// ============================================================
// 55. REAL PLAYWRIGHT STYLE TYPES
// ============================================================

console.log("\n55. PLAYWRIGHT STYLE");

interface TestConfig {

  baseURL: string;

  browser:
    | "chromium"
    | "firefox"
    | "webkit";

  headless: boolean;

}

const testConfig:
  TestConfig = {

  baseURL:
    "https://example.com",

  browser:
    "chromium",

  headless:
    false

};

console.log(
  testConfig
);


// ============================================================
// 56. REAL API RESPONSE TYPE
// ============================================================

interface CandidateApiData {

  id: number;

  name: string;

  email: string;

  score: number;

}

interface ApiResponse<T> {

  success: boolean;

  data: T;

  message: string;

}

const candidateResponse:
  ApiResponse<CandidateApiData> = {

  success: true,

  message:
    "Candidate fetched successfully",

  data: {

    id: 101,

    name: "Satish",

    email:
      "satish@example.com",

    score: 90

  }

};

console.log(
  candidateResponse.data.name
);

console.log(
  candidateResponse.data.score
);


// ============================================================
// 57. REAL PLAYWRIGHT PAGE OBJECT STYLE
// ============================================================

interface PageActions {

  login(
    username: string,
    password: string
  ): Promise<void>;

}

class LoginPageObject
  implements PageActions {

  async login(
    username: string,
    password: string
  ): Promise<void> {

    console.log(
      `Logging in ${username}`
    );

    // Example Playwright:
    //
    // await page
    //   .getByLabel("Username")
    //   .fill(username);
    //
    // await page
    //   .getByLabel("Password")
    //   .fill(password);
    //
    // await page
    //   .getByRole("button", {
    //      name: "Login"
    //   })
    //   .click();

  }

}

const loginPageObject =
  new LoginPageObject();

await loginPageObject.login(
  "satish",
  "password"
);


// ============================================================
// 58. NULLISH COALESCING IN QA
// ============================================================

const expectedStatus:
  string | undefined =
  undefined;

const statusToCheck =
  expectedStatus ?? "Approved";

console.log(
  statusToCheck
);


// ============================================================
// 59. OPTIONAL CHAINING IN API DATA
// ============================================================

interface ApiCandidate {

  name: string;

  address?: {
    city?: string;
  };

}

const apiCandidate:
  ApiCandidate = {

  name: "Satish"

};

console.log(
  apiCandidate.address?.city
);


// Returns undefined instead of throwing an error.


// ============================================================
// 60. FINAL TYPECRIPT ROADMAP
// ============================================================

console.log(`
============================================================
TYPESCRIPT LEARNING ROADMAP
============================================================

BASIC
------------------------------------------------------------

1. Variables
2. String
3. Number
4. Boolean
5. Arrays
6. Loops
7. Conditions
8. Operators


FUNCTIONS
------------------------------------------------------------

9. Functions
10. Parameters
11. Return types
12. Optional parameters
13. Default parameters
14. Rest parameters
15. Arrow functions


OBJECTS / TYPES
------------------------------------------------------------

16. Objects
17. Type aliases
18. Interfaces
19. Optional properties
20. readonly
21. Union types
22. Literal types
23. Tuples
24. Enums


TYPE SYSTEM
------------------------------------------------------------

25. any
26. unknown
27. null
28. undefined
29. Type narrowing
30. Type guards
31. Type assertions
32. keyof
33. typeof


ADVANCED TYPES
------------------------------------------------------------

34. Generics
35. Record
36. Partial
37. Pick
38. Omit
39. ReturnType


OOP
------------------------------------------------------------

40. Classes
41. Constructor
42. public
43. private
44. protected
45. extends
46. implements
47. abstract


ASYNC
------------------------------------------------------------

48. Promise
49. async
50. await
51. try/catch
52. throw
53. finally


MODERN JS / TS
------------------------------------------------------------

54. Optional chaining ?.
55. Nullish coalescing ??
56. Ternary
57. Spread ...
58. Destructuring
59. Modules
60. import/export


PLAYWRIGHT
------------------------------------------------------------

61. Locators
62. Page Object Model
63. Fixtures
64. Hooks
65. Assertions
66. API testing
67. Request / Response
68. Interfaces for API responses
69. Environment configuration
70. Custom utilities
71. Custom fixtures
72. Parallel execution
73. Test data management


============================================================
`);