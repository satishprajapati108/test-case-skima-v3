// ============================================================
// TYPESCRIPT STRING PRACTICE
// ============================================================


// ============================================================
// 1. CREATING STRINGS
// ============================================================

const name: string = "Satish";

let city = "Mumbai";

console.log("1. name:", name);
console.log("1. city:", city);


// TypeScript can infer that city is a string.
//
// This:
// const city = "Mumbai";
//
// is basically understood as:
// const city: string = "Mumbai";


// ============================================================
// 2. SINGLE QUOTES / DOUBLE QUOTES / BACKTICKS
// ============================================================

const firstName = "Satish";
const lastName = 'Prajapati';

const fullName = `${firstName} ${lastName}`;

console.log("2. fullName:", fullName);


// Backticks are called TEMPLATE LITERALS.


// ============================================================
// 3. STRING LENGTH
// ============================================================

const message = "Hello TypeScript";

console.log("3. length:", message.length);


// ============================================================
// 4. ACCESS CHARACTER BY INDEX
// ============================================================

const word = "TypeScript";

console.log("4. First character:", word[0]);
console.log("4. Second character:", word[1]);
console.log("4. Last character:", word[word.length - 1]);


// Index starts from 0.
//
// T y p e S c r i p t
// 0 1 2 3 4 5 6 7 8 9


// ============================================================
// 5. charAt()
// ============================================================

console.log("5. charAt(0):", word.charAt(0));
console.log("5. charAt(4):", word.charAt(4));


// ============================================================
// 6. charCodeAt()
// ============================================================

console.log("6. charCodeAt(0):", word.charCodeAt(0));


// Returns the Unicode/ASCII number of the character.


// ============================================================
// 7. toUpperCase()
// ============================================================

const lowerText = "hello world";

console.log("7. Uppercase:", lowerText.toUpperCase());


// ============================================================
// 8. toLowerCase()
// ============================================================

const upperText = "HELLO WORLD";

console.log("8. Lowercase:", upperText.toLowerCase());


// ============================================================
// 9. trim()
// ============================================================

const textWithSpaces = "   Hello World   ";

console.log("9. Before trim:", `"${textWithSpaces}"`);
console.log("9. After trim:", `"${textWithSpaces.trim()}"`);


// Removes spaces from beginning and end.


// ============================================================
// 10. trimStart()
// ============================================================

const text1 = "   Hello";

console.log("10. trimStart:", `"${text1.trimStart()}"`);


// ============================================================
// 11. trimEnd()
// ============================================================

const text2 = "Hello   ";

console.log("11. trimEnd:", `"${text2.trimEnd()}"`);


// ============================================================
// 12. includes()
// ============================================================

const sentence = "I am working as a QA Engineer";

console.log(
  "12. Contains QA:",
  sentence.includes("QA")
);

console.log(
  "12. Contains Developer:",
  sentence.includes("Developer")
);


// Returns true / false.


// ============================================================
// 13. startsWith()
// ============================================================

const url = "https://example.com";

console.log(
  "13. startsWith https:",
  url.startsWith("https")
);

console.log(
  "13. startsWith http:",
  url.startsWith("http")
);


// ============================================================
// 14. endsWith()
// ============================================================

const fileName = "resume.pdf";

console.log(
  "14. endsWith .pdf:",
  fileName.endsWith(".pdf")
);

console.log(
  "14. endsWith .docx:",
  fileName.endsWith(".docx")
);


// ============================================================
// 15. indexOf()
// ============================================================

const email = "satish@example.com";

console.log(
  "15. indexOf @:",
  email.indexOf("@")
);

console.log(
  "15. indexOf example:",
  email.indexOf("example")
);


// Returns position.
//
// If not found:
// -1


console.log(
  "15. indexOf gmail:",
  email.indexOf("gmail")
);


// ============================================================
// 16. lastIndexOf()
// ============================================================

const repeated = "hello hello hello";

console.log(
  "16. lastIndexOf hello:",
  repeated.lastIndexOf("hello")
);


// ============================================================
// 17. includes() vs indexOf()
// ============================================================

const testString = "Playwright Testing";

console.log(
  "17. includes:",
  testString.includes("Testing")
);

console.log(
  "17. indexOf:",
  testString.indexOf("Testing")
);


// includes() → true / false
// indexOf() → position / -1


// ============================================================
// 18. startsWith() / endsWith()
// ============================================================

const resume = "satish_resume.pdf";

console.log(
  "18. startsWith satish:",
  resume.startsWith("satish")
);

console.log(
  "18. endsWith pdf:",
  resume.endsWith(".pdf")
);


// ============================================================
// 19. slice()
// ============================================================

const language = "TypeScript";

console.log(
  "19. slice(0, 4):",
  language.slice(0, 4)
);

console.log(
  "19. slice(4):",
  language.slice(4)
);

console.log(
  "19. slice(-6):",
  language.slice(-6)
);


// TypeScript
// 0123456789
//
// slice(0, 4) → Type
// slice(4)    → Script


// ============================================================
// 20. substring()
// ============================================================

const tech = "JavaScript";

console.log(
  "20. substring(0, 4):",
  tech.substring(0, 4)
);

console.log(
  "20. substring(4):",
  tech.substring(4)
);


// ============================================================
// 21. substr() - OLD / DEPRECATED
// ============================================================

// Avoid using substr() in new code.


// ============================================================
// 22. replace()
// ============================================================

const greeting = "Hello World";

console.log(
  "22. replace:",
  greeting.replace("World", "Satish")
);


// ============================================================
// 23. replaceAll()
// ============================================================

const fruits = "apple apple apple";

console.log(
  "23. replaceAll:",
  fruits.replaceAll("apple", "banana")
);


// replace() normally replaces the first match.
// replaceAll() replaces all matches.


// ============================================================
// 24. REPLACE USING REGEX
// ============================================================

const numbers = "123-456-789";

console.log(
  "24. Regex replace:",
  numbers.replace(/-/g, "")
);


// Result:
// 123456789


// ============================================================
// 25. split()
// ============================================================

const names = "Satish,Rahul,Amit";

const nameArray = names.split(",");

console.log("25. split:", nameArray);


// Result:
// ["Satish", "Rahul", "Amit"]


// ============================================================
// 26. split() WITH SPACE
// ============================================================

const sentence2 = "I love TypeScript";

const words = sentence2.split(" ");

console.log("26. words:", words);


// ============================================================
// 27. split() INTO CHARACTERS
// ============================================================

const chars = "Hello".split("");

console.log("27. characters:", chars);


// ============================================================
// 28. CONCAT()
// ============================================================

const first = "Hello";
const second = "World";

console.log(
  "28. concat:",
  first.concat(" ", second)
);


// ============================================================
// 29. CONCATENATION USING +
// ============================================================

const user = "Satish";

const greeting2 = "Hello " + user;

console.log("29. + operator:", greeting2);


// ============================================================
// 30. TEMPLATE LITERAL
// ============================================================

const age = 25;

const introduction =
  `My name is ${user} and I am ${age} years old.`;

console.log("30. Template:", introduction);


// Template literals are generally preferred over +
// for dynamic strings.


// ============================================================
// 31. repeat()
// ============================================================

console.log(
  "31. repeat:",
  "Hello ".repeat(3)
);


// ============================================================
// 32. padStart()
// ============================================================

const number = "5";

console.log(
  "32. padStart:",
  number.padStart(3, "0")
);


// Result:
// "005"


// ============================================================
// 33. padEnd()
// ============================================================

const number2 = "5";

console.log(
  "33. padEnd:",
  number2.padEnd(3, "0")
);


// Result:
// "500"


// ============================================================
// 34. MATCH()
// ============================================================

const text = "My phone numbers are 123 and 456";

const matchedNumbers = text.match(/\d+/g);

console.log(
  "34. match:",
  matchedNumbers
);


// ============================================================
// 35. SEARCH()
// ============================================================

const searchText = "Hello TypeScript";

console.log(
  "35. search TypeScript:",
  searchText.search("TypeScript")
);


// ============================================================
// 36. REGULAR EXPRESSION TEST
// ============================================================

const emailText = "satish@gmail.com";

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(
  "36. Valid email:",
  emailRegex.test(emailText)
);


// ============================================================
// 37. STRING COMPARISON
// ============================================================

const a = "hello";
const b = "hello";
const c = "Hello";

console.log("37. a === b:", a === b);
console.log("37. a === c:", a === c);


// Strings are case-sensitive.


// ============================================================
// 38. CASE-INSENSITIVE COMPARISON
// ============================================================

const input1 = "YES";
const input2 = "yes";

console.log(
  "38. Case insensitive:",
  input1.toLowerCase() === input2.toLowerCase()
);


// ============================================================
// 39. EMPTY STRING
// ============================================================

const emptyString = "";

console.log(
  "39. Empty:",
  emptyString.length === 0
);


// ============================================================
// 40. EMPTY STRING CHECK
// ============================================================

const username = "Satish";

if (username.length === 0) {
  console.log("40. Username is empty");
} else {
  console.log("40. Username is not empty");
}


// ============================================================
// 41. TRIM + EMPTY CHECK
// ============================================================

const input = "     ";

if (input.trim().length === 0) {
  console.log("41. Input contains only spaces");
}


// This is very common in form validation.


// ============================================================
// 42. STRING TO NUMBER
// ============================================================

const salaryString = "300000";

const salaryNumber = Number(salaryString);

console.log(
  "42. String to number:",
  salaryNumber
);

console.log(
  "42. Type:",
  typeof salaryNumber
);


// ============================================================
// 43. NUMBER TO STRING
// ============================================================

const salary = 300000;

const salaryText = String(salary);

console.log(
  "43. Number to string:",
  salaryText
);

console.log(
  "43. Type:",
  typeof salaryText
);


// ============================================================
// 44. parseInt()
// ============================================================

const value1 = "100px";

console.log(
  "44. parseInt:",
  parseInt(value1)
);


// Result:
// 100


// ============================================================
// 45. parseFloat()
// ============================================================

const value2 = "10.50";

console.log(
  "45. parseFloat:",
  parseFloat(value2)
);


// ============================================================
// 46. typeof
// ============================================================

const value = "Hello";

console.log(
  "46. typeof:",
  typeof value
);


// Result:
// string


// ============================================================
// 47. STRING TYPE IN FUNCTION PARAMETER
// ============================================================

function greet(name: string) {
  return `Hello ${name}`;
}

console.log(
  "47. Function:",
  greet("Satish")
);


// ============================================================
// 48. STRING RETURN TYPE
// ============================================================

function getRole(): string {
  return "QA Engineer";
}

console.log(
  "48. Return type:",
  getRole()
);


// ============================================================
// 49. OPTIONAL STRING PARAMETER
// ============================================================

function welcome(name?: string): string {

  if (name) {
    return `Welcome ${name}`;
  }

  return "Welcome Guest";
}

console.log(
  "49. Optional:",
  welcome()
);

console.log(
  "49. Optional:",
  welcome("Satish")
);


// ============================================================
// 50. UNION TYPE WITH STRING
// ============================================================

let status: "pending" | "approved" | "rejected";

status = "pending";

console.log(
  "50. Status:",
  status
);


// Only these values are allowed:
//
// "pending"
// "approved"
// "rejected"


// ============================================================
// 51. STRING ARRAY
// ============================================================

const skills: string[] = [
  "Playwright",
  "TypeScript",
  "Postman",
  "API Testing"
];

console.log(
  "51. Skills:",
  skills
);

console.log(
  "51. First skill:",
  skills[0]
);


// ============================================================
// 52. STRING ARRAY METHODS
// ============================================================

skills.push("JavaScript");

console.log(
  "52. After push:",
  skills
);

skills.pop();

console.log(
  "52. After pop:",
  skills
);


// ============================================================
// 53. JOIN()
// ============================================================

const skillText = skills.join(", ");

console.log(
  "53. join:",
  skillText
);


// Array:
// ["Playwright", "TypeScript", "Postman"]
//
// join(", "):
// "Playwright, TypeScript, Postman"


// ============================================================
// 54. COMMON REAL-WORLD QA EXAMPLE
// ============================================================

const actualStatus = "Approved";

if (actualStatus.toLowerCase() === "approved") {
  console.log(
    "54. TEST PASSED: Candidate is approved"
  );
} else {
  console.log(
    "54. TEST FAILED: Candidate is not approved"
  );
}


// ============================================================
// 55. REAL-WORLD FILE VALIDATION
// ============================================================

const uploadedFile = "resume.pdf";

if (uploadedFile.toLowerCase().endsWith(".pdf")) {
  console.log(
    "55. Valid PDF file"
  );
} else {
  console.log(
    "55. Invalid file"
  );
}


// ============================================================
// 56. REAL-WORLD EMAIL VALIDATION
// ============================================================

const userEmail = "satish@example.com";

if (userEmail.includes("@")) {
  console.log(
    "56. Email contains @"
  );
} else {
  console.log(
    "56. Invalid email"
  );
}


// ============================================================
// 57. REAL-WORLD SEARCH
// ============================================================

const jobTitle = "Senior QA Automation Engineer";

if (
  jobTitle
    .toLowerCase()
    .includes("automation")
) {
  console.log(
    "57. Job requires automation"
  );
}


// ============================================================
// 58. REAL-WORLD LOCATION CHECK
// ============================================================

const candidateLocation = "Thane";

const allowedLocations = [
  "Thane",
  "Mulund",
  "Nahur",
  "Bhandup",
  "Ghatkopar"
];

if (allowedLocations.includes(candidateLocation)) {
  console.log(
    "58. Candidate location is allowed"
  );
} else {
  console.log(
    "58. Candidate location is NOT allowed"
  );
}


// ============================================================
// 59. CHAINING STRING METHODS
// ============================================================

const rawInput = "   SATISH PRAJAPATI   ";

const cleanedName = rawInput
  .trim()
  .toLowerCase()
  .replace("satish", "mr. satish");

console.log(
  "59. Chained methods:",
  cleanedName
);


// ============================================================
// 60. FINAL SUMMARY
// ============================================================

console.log(`
============================================================
STRING METHODS TO REMEMBER
============================================================

length
charAt()
charCodeAt()

toUpperCase()
toLowerCase()

trim()
trimStart()
trimEnd()

includes()
startsWith()
endsWith()

indexOf()
lastIndexOf()

slice()
substring()

replace()
replaceAll()

split()
concat()

repeat()

padStart()
padEnd()

match()
search()

Number()
String()
parseInt()
parseFloat()

typeof

============================================================
IMPORTANT
============================================================

String:
const name: string = "Satish";

String array:
const names: string[] = ["Satish", "Rahul"];

Function parameter:
function greet(name: string)

Function return:
function getName(): string

Union string:
let status: "pending" | "approved" | "rejected";

============================================================
`);