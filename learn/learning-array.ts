// ============================================================
// TYPESCRIPT ARRAYS - COMPLETE PRACTICE FILE
// ============================================================


// ============================================================
// 1. CREATE AN ARRAY
// ============================================================

const names: string[] = [
  "Satish",
  "Rahul",
  "Amit"
];

console.log("1. names:", names);


// TypeScript knows this is:
// string[]


// ============================================================
// 2. NUMBER ARRAY
// ============================================================

const marks: number[] = [80, 90, 75, 88];

console.log("2. marks:", marks);


// ============================================================
// 3. BOOLEAN ARRAY
// ============================================================

const results: boolean[] = [
  true,
  false,
  true
];

console.log("3. results:", results);


// ============================================================
// 4. ARRAY LENGTH
// ============================================================

console.log("4. length:", names.length);


// ============================================================
// 5. ACCESS ARRAY ELEMENT
// ============================================================

console.log("5. First:", names[0]);
console.log("5. Second:", names[1]);
console.log("5. Last:", names[names.length - 1]);


// Index starts from 0.
//
// ["Satish", "Rahul", "Amit"]
//      0        1        2


// ============================================================
// 6. CHANGE ARRAY ELEMENT
// ============================================================

const users = [
  "Satish",
  "Rahul",
  "Amit"
];

users[1] = "Rohit";

console.log("6. Updated users:", users);


// ============================================================
// 7. push()
// ADD ELEMENT TO END
// ============================================================

const skills: string[] = [
  "Playwright",
  "TypeScript"
];

skills.push("Postman");

console.log("7. After push:", skills);


// Result:
// ["Playwright", "TypeScript", "Postman"]


// ============================================================
// 8. push() MULTIPLE ELEMENTS
// ============================================================

skills.push(
  "API Testing",
  "JavaScript"
);

console.log("8. Multiple push:", skills);


// ============================================================
// 9. pop()
// REMOVE LAST ELEMENT
// ============================================================

const technologies = [
  "Playwright",
  "TypeScript",
  "Postman"
];

const removedTechnology = technologies.pop();

console.log("9. Removed:", removedTechnology);
console.log("9. Array:", technologies);


// ============================================================
// 10. unshift()
// ADD ELEMENT TO BEGINNING
// ============================================================

const fruits = [
  "Apple",
  "Banana"
];

fruits.unshift("Mango");

console.log("10. unshift:", fruits);


// ============================================================
// 11. shift()
// REMOVE FIRST ELEMENT
// ============================================================

const firstFruit = fruits.shift();

console.log("11. Removed:", firstFruit);
console.log("11. Array:", fruits);


// ============================================================
// 12. includes()
// CHECK IF ELEMENT EXISTS
// ============================================================

const locations = [
  "Thane",
  "Mulund",
  "Bhandup",
  "Ghatkopar"
];

console.log(
  "12. Has Thane:",
  locations.includes("Thane")
);

console.log(
  "12. Has Andheri:",
  locations.includes("Andheri")
);


// Returns:
// true / false


// ============================================================
// 13. indexOf()
// FIND ELEMENT POSITION
// ============================================================

console.log(
  "13. Thane index:",
  locations.indexOf("Thane")
);

console.log(
  "13. Andheri index:",
  locations.indexOf("Andheri")
);


// If not found:
// -1


// ============================================================
// 14. lastIndexOf()
// ============================================================

const duplicateNames = [
  "Satish",
  "Rahul",
  "Satish",
  "Amit"
];

console.log(
  "14. First Satish:",
  duplicateNames.indexOf("Satish")
);

console.log(
  "14. Last Satish:",
  duplicateNames.lastIndexOf("Satish")
);


// ============================================================
// 15. slice()
// COPY PART OF ARRAY
// ============================================================

const numbers = [
  10,
  20,
  30,
  40,
  50
];

const selectedNumbers = numbers.slice(1, 4);

console.log(
  "15. slice:",
  selectedNumbers
);


// Result:
// [20, 30, 40]
//
// IMPORTANT:
// slice() DOES NOT modify original array.


// ============================================================
// 16. splice()
// ADD / REMOVE ELEMENTS
// ============================================================

const employees = [
  "Satish",
  "Rahul",
  "Amit"
];

employees.splice(1, 1);

console.log(
  "16. After splice:",
  employees
);


// Removed Rahul.


// ============================================================
// 17. splice() ADD ELEMENT
// ============================================================

const employees2 = [
  "Satish",
  "Rahul"
];

employees2.splice(1, 0, "Amit");

console.log(
  "17. After adding:",
  employees2
);


// Result:
// ["Satish", "Amit", "Rahul"]


// ============================================================
// 18. concat()
// COMBINE ARRAYS
// ============================================================

const frontend = [
  "HTML",
  "CSS"
];

const backend = [
  "Node.js",
  "Java"
];

const fullStack = frontend.concat(backend);

console.log(
  "18. Combined:",
  fullStack
);


// ============================================================
// 19. join()
// ARRAY -> STRING
// ============================================================

const skills2 = [
  "Playwright",
  "TypeScript",
  "Postman"
];

const skillText = skills2.join(", ");

console.log(
  "19. join:",
  skillText
);


// Result:
// "Playwright, TypeScript, Postman"


// ============================================================
// 20. split()
// STRING -> ARRAY
// ============================================================

const skillString = "Playwright,TypeScript,Postman";

const skillArray = skillString.split(",");

console.log(
  "20. split:",
  skillArray
);


// ============================================================
// 21. forEach()
// LOOP THROUGH ARRAY
// ============================================================

const candidates = [
  "Satish",
  "Rahul",
  "Amit"
];

candidates.forEach((candidate) => {
  console.log(
    "21. Candidate:",
    candidate
  );
});


// ============================================================
// 22. forEach() WITH INDEX
// ============================================================

candidates.forEach((candidate, index) => {
  console.log(
    `22. ${index}: ${candidate}`
  );
});


// ============================================================
// 23. map()
// CREATE A NEW ARRAY
// ============================================================

const numbers2 = [
  1,
  2,
  3,
  4
];

const doubled = numbers2.map((number) => {
  return number * 2;
});

console.log(
  "23. Doubled:",
  doubled
);


// Result:
// [2, 4, 6, 8]


// IMPORTANT:
//
// forEach() -> performs something
//
// map() -> creates a NEW array


// ============================================================
// 24. map() WITH STRINGS
// ============================================================

const names2 = [
  "satish",
  "rahul",
  "amit"
];

const upperNames = names2.map((name) => {
  return name.toUpperCase();
});

console.log(
  "24. Upper names:",
  upperNames
);


// ============================================================
// 25. filter()
// GET ELEMENTS THAT MATCH CONDITION
// ============================================================

const ages = [
  18,
  25,
  30,
  16,
  40
];

const adults = ages.filter((age) => {
  return age >= 18;
});

console.log(
  "25. Adults:",
  adults
);


// Result:
// [18, 25, 30, 40]


// ============================================================
// 26. FILTER STRINGS
// ============================================================

const cities = [
  "Mumbai",
  "Delhi",
  "Thane",
  "Pune",
  "Mulund"
];

const mCities = cities.filter((city) => {
  return city.toLowerCase().startsWith("m");
});

console.log(
  "26. M cities:",
  mCities
);


// ============================================================
// 27. find()
// FIND FIRST MATCH
// ============================================================

const numbers3 = [
  10,
  20,
  30,
  40
];

const foundNumber = numbers3.find((number) => {
  return number > 20;
});

console.log(
  "27. First number > 20:",
  foundNumber
);


// Result:
// 30


// ============================================================
// 28. findIndex()
// ============================================================

const foundIndex = numbers3.findIndex((number) => {
  return number > 20;
});

console.log(
  "28. Index:",
  foundIndex
);


// ============================================================
// 29. some()
// CHECK IF AT LEAST ONE MATCHES
// ============================================================

const scores = [
  40,
  55,
  70,
  30
];

const hasHighScore = scores.some((score) => {
  return score >= 70;
});

console.log(
  "29. Has score >= 70:",
  hasHighScore
);


// true


// ============================================================
// 30. every()
// CHECK IF ALL MATCH
// ============================================================

const scores2 = [
  80,
  90,
  75
];

const allPassed = scores2.every((score) => {
  return score >= 50;
});

console.log(
  "30. All passed:",
  allPassed
);


// true


// ============================================================
// 31. REDUCE()
// COMBINE ARRAY INTO ONE VALUE
// ============================================================

const salaries = [
  300000,
  400000,
  500000
];

const totalSalary = salaries.reduce(
  (total, salary) => {
    return total + salary;
  },
  0
);

console.log(
  "31. Total salary:",
  totalSalary
);


// Result:
// 1200000


// ============================================================
// 32. SORT()
// ============================================================

const names3 = [
  "Rahul",
  "Amit",
  "Satish"
];

names3.sort();

console.log(
  "32. Sorted names:",
  names3
);


// ============================================================
// 33. SORT NUMBERS
// ============================================================

const numbers4 = [
  100,
  20,
  5,
  50
];

numbers4.sort((a, b) => {
  return a - b;
});

console.log(
  "33. Ascending:",
  numbers4
);


// IMPORTANT:
//
// numbers4.sort()
//
// can produce unexpected results for numbers.
//
// Use:
// sort((a, b) => a - b)


// ============================================================
// 34. SORT DESCENDING
// ============================================================

numbers4.sort((a, b) => {
  return b - a;
});

console.log(
  "34. Descending:",
  numbers4
);


// ============================================================
// 35. reverse()
// ============================================================

const letters = [
  "A",
  "B",
  "C",
  "D"
];

letters.reverse();

console.log(
  "35. Reverse:",
  letters
);


// ============================================================
// 36. FLAT()
// NESTED ARRAY -> SINGLE ARRAY
// ============================================================

const nestedNumbers = [
  [1, 2],
  [3, 4],
  [5, 6]
];

const flatNumbers = nestedNumbers.flat();

console.log(
  "36. Flat:",
  flatNumbers
);


// ============================================================
// 37. FLATMAP()
// ============================================================

const nums = [1, 2, 3];

const multiplied = nums.flatMap((number) => {
  return [number, number * 10];
});

console.log(
  "37. flatMap:",
  multiplied
);


// Result:
// [1, 10, 2, 20, 3, 30]


// ============================================================
// 38. CHECK ARRAY
// ============================================================

console.log(
  "38. Is array:",
  Array.isArray(names)
);

console.log(
  "38. Is array:",
  Array.isArray("Hello")
);


// ============================================================
// 39. EMPTY ARRAY
// ============================================================

const emptyArray: string[] = [];

console.log(
  "39. Empty:",
  emptyArray.length === 0
);


// ============================================================
// 40. ADD ELEMENT TO EMPTY ARRAY
// ============================================================

emptyArray.push("Playwright");

console.log(
  "40. Empty array now:",
  emptyArray
);


// ============================================================
// 41. LOOP USING for...of
// ============================================================

const tools = [
  "Playwright",
  "Postman",
  "Jira"
];

for (const tool of tools) {
  console.log(
    "41. Tool:",
    tool
  );
}


// ============================================================
// 42. LOOP USING for...in
// ============================================================

for (const index in tools) {
  console.log(
    "42. Index:",
    index,
    "Value:",
    tools[index]
  );
}


// IMPORTANT:
//
// for...of -> values
//
// for...in -> indexes


// ============================================================
// 43. DESTRUCTURING
// ============================================================

const employeeNames = [
  "Satish",
  "Rahul",
  "Amit"
];

const [
  employee1,
  employee2,
  employee3
] = employeeNames;

console.log(
  "43. Employee 1:",
  employee1
);

console.log(
  "43. Employee 2:",
  employee2
);


// ============================================================
// 44. REST OPERATOR
// ============================================================

const allNames = [
  "Satish",
  "Rahul",
  "Amit",
  "Rohit"
];

const [
  firstEmployee,
  ...remainingEmployees
] = allNames;

console.log(
  "44. First:",
  firstEmployee
);

console.log(
  "44. Remaining:",
  remainingEmployees
);


// ============================================================
// 45. SPREAD OPERATOR
// COPY / COMBINE ARRAYS
// ============================================================

const qaSkills = [
  "Manual Testing",
  "API Testing"
];

const automationSkills = [
  "Playwright",
  "TypeScript"
];

const allSkills = [
  ...qaSkills,
  ...automationSkills
];

console.log(
  "45. All skills:",
  allSkills
);


// ============================================================
// 46. COPY ARRAY
// ============================================================

const original = [
  "A",
  "B",
  "C"
];

const copy = [...original];

copy.push("D");

console.log(
  "46. Original:",
  original
);

console.log(
  "46. Copy:",
  copy
);


// ============================================================
// 47. ARRAY OF OBJECTS
// ============================================================

const candidates2 = [
  {
    name: "Satish",
    score: 90
  },
  {
    name: "Rahul",
    score: 70
  },
  {
    name: "Amit",
    score: 85
  }
];

console.log(
  "47. First candidate:",
  candidates2[0]
);

console.log(
  "47. First candidate name:",
  candidates2[0].name
);


// ============================================================
// 48. FILTER ARRAY OF OBJECTS
// ============================================================

const highScorers = candidates2.filter(
  (candidate) => candidate.score >= 80
);

console.log(
  "48. High scorers:",
  highScorers
);


// ============================================================
// 49. MAP ARRAY OF OBJECTS
// ============================================================

const candidateNames = candidates2.map(
  (candidate) => candidate.name
);

console.log(
  "49. Candidate names:",
  candidateNames
);


// ============================================================
// 50. FIND OBJECT
// ============================================================

const candidate = candidates2.find(
  (candidate) => candidate.name === "Satish"
);

console.log(
  "50. Found candidate:",
  candidate
);


// ============================================================
// 51. REAL PLAYWRIGHT EXAMPLE
// ============================================================

// Imagine these are rows from a table.

const jobStatuses = [
  "Draft",
  "Published",
  "Published",
  "Closed"
];

const publishedJobs = jobStatuses.filter(
  (status) => status === "Published"
);

console.log(
  "51. Published jobs:",
  publishedJobs
);


// ============================================================
// 52. PLAYWRIGHT-STYLE EXPECTATION
// ============================================================

// Example:
//
// const statuses = await page
//   .locator(".status")
//   .allTextContents();
//
// console.log(statuses);
//
// const published = statuses.filter(
//   (status) => status.trim() === "Published"
// );


// ============================================================
// 53. REAL QA EXAMPLE - REQUIRED LOCATIONS
// ============================================================

const requiredLocations = [
  "Thane",
  "Mulund",
  "Nahur",
  "Bhandup",
  "Ghatkopar"
];

const candidateLocation = "Thane";

const isLocationAllowed =
  requiredLocations.includes(candidateLocation);

console.log(
  "53. Location allowed:",
  isLocationAllowed
);


// ============================================================
// 54. REAL QA EXAMPLE - FIND FAILED TESTS
// ============================================================

const testResults = [
  {
    test: "Login",
    status: "passed"
  },
  {
    test: "Search",
    status: "failed"
  },
  {
    test: "Logout",
    status: "passed"
  }
];

const failedTests = testResults.filter(
  (test) => test.status === "failed"
);

console.log(
  "54. Failed tests:",
  failedTests
);


// ============================================================
// 55. REAL QA EXAMPLE - GET TEST NAMES
// ============================================================

const testNames = testResults.map(
  (test) => test.test
);

console.log(
  "55. Test names:",
  testNames
);


// ============================================================
// 56. CHAINING ARRAY METHODS
// ============================================================

const candidateScores = [
  45,
  80,
  90,
  30,
  75
];

const highScores = candidateScores
  .filter((score) => score >= 70)
  .map((score) => score * 2);

console.log(
  "56. High scores doubled:",
  highScores
);


// First:
// filter -> [80, 90, 75]
//
// Then:
// map -> [160, 180, 150]


// ============================================================
// 57. IMPORTANT: METHODS THAT MODIFY ORIGINAL ARRAY
// ============================================================

// These CAN modify the original array:
//
// push()
// pop()
// shift()
// unshift()
// splice()
// sort()
// reverse()


// These generally RETURN A NEW RESULT:
//
// map()
// filter()
// slice()
// concat()


// ============================================================
// 58. FINAL SUMMARY
// ============================================================

console.log(`
============================================================
ARRAY METHODS TO LEARN FIRST
============================================================

length
push()
pop()
shift()
unshift()

includes()
indexOf()
lastIndexOf()

slice()
splice()

concat()
join()
split()

forEach()
map()
filter()

find()
findIndex()

some()
every()

reduce()

sort()
reverse()

flat()
flatMap()

Array.isArray()

============================================================
MOST IMPORTANT FOR QA / PLAYWRIGHT
============================================================

forEach()  -> loop through items
map()      -> transform items
filter()   -> select items
find()     -> find first matching item
some()     -> at least one matches
every()    -> all match
includes() -> check exact value
findIndex()-> find position
join()     -> array -> string
split()    -> string -> array

============================================================
`);