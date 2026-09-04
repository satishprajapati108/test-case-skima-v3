// ============================================================
// TYPESCRIPT LOOPS - COMPLETE PRACTICE FILE
// ============================================================
//
// Main loops:
//
// 1. for
// 2. for...of
// 3. for...in
// 4. while
// 5. do...while
// 6. forEach()
//
// Also:
//
// break
// continue
// nested loops
// loops with arrays
// loops with objects
// loops with conditions
// async loops
// Playwright-style examples
//
// ============================================================


// ============================================================
// 1. BASIC FOR LOOP
// ============================================================
//
// Syntax:
//
// for (start; condition; increment) {
//     code
// }
//
// Example:
//
// start     -> let i = 0
// condition -> i < 5
// increment -> i++
//
// ============================================================

console.log("\n1. BASIC FOR LOOP");

for (let i = 0; i < 5; i++) {
  console.log("i =", i);
}


// Output:
//
// i = 0
// i = 1
// i = 2
// i = 3
// i = 4
//
// Why not 5?
//
// Because condition is:
// i < 5
//
// When i becomes 5:
//
// 5 < 5 -> false
//
// Loop stops.


// ============================================================
// 2. FOR LOOP - START FROM 1
// ============================================================

console.log("\n2. FOR LOOP FROM 1 TO 5");

for (let i = 1; i <= 5; i++) {
  console.log(i);
}


// Output:
//
// 1
// 2
// 3
// 4
// 5


// ============================================================
// 3. FOR LOOP - DECREMENT
// ============================================================

console.log("\n3. FOR LOOP BACKWARDS");

for (let i = 5; i >= 1; i--) {
  console.log(i);
}


// Output:
//
// 5
// 4
// 3
// 2
// 1


// ============================================================
// 4. FOR LOOP - STEP BY 2
// ============================================================

console.log("\n4. FOR LOOP STEP BY 2");

for (let i = 0; i <= 10; i += 2) {
  console.log(i);
}


// Output:
//
// 0
// 2
// 4
// 6
// 8
// 10


// ============================================================
// 5. FOR LOOP WITH ARRAY
// ============================================================

console.log("\n5. FOR LOOP WITH ARRAY");

const names = [
  "Satish",
  "Rahul",
  "Amit"
];

for (let i = 0; i < names.length; i++) {
  console.log(
    "Index:",
    i,
    "Name:",
    names[i]
  );
}


// This is very important.
//
// names.length = 3
//
// i = 0 -> names[0]
// i = 1 -> names[1]
// i = 2 -> names[2]


// ============================================================
// 6. FOR LOOP - ARRAY OF NUMBERS
// ============================================================

console.log("\n6. FOR LOOP NUMBERS");

const numbers = [
  10,
  20,
  30,
  40
];

for (let i = 0; i < numbers.length; i++) {

  console.log(
    "Number:",
    numbers[i]
  );
}


// ============================================================
// 7. FOR LOOP WITH CONDITION
// ============================================================

console.log("\n7. FOR LOOP + IF");

for (let i = 1; i <= 10; i++) {

  if (i % 2 === 0) {
    console.log(
      "Even:",
      i
    );
  }

}


// ============================================================
// 8. for...of LOOP
// ============================================================
//
// for...of gives you the VALUE directly.
//
// ============================================================

console.log("\n8. FOR...OF");

const skills = [
  "Playwright",
  "TypeScript",
  "Postman"
];

for (const skill of skills) {

  console.log(
    "Skill:",
    skill
  );

}


// You don't need:
//
// skills[i]
//
// You directly get:
//
// skill


// ============================================================
// 9. for...of WITH STRINGS
// ============================================================

console.log("\n9. FOR...OF STRING");

const word = "Hello";

for (const character of word) {

  console.log(
    "Character:",
    character
  );

}


// Output:
//
// H
// e
// l
// l
// o


// ============================================================
// 10. for...of WITH NUMBERS
// ============================================================

console.log("\n10. FOR...OF NUMBERS");

const marks = [
  80,
  90,
  75,
  88
];

for (const mark of marks) {

  console.log(
    "Mark:",
    mark
  );

}


// ============================================================
// 11. for...in LOOP
// ============================================================
//
// for...in gives you the KEY / INDEX.
//
// With arrays:
//
// index
//
// With objects:
//
// property name
//
// ============================================================

console.log("\n11. FOR...IN ARRAY");

const cities = [
  "Mumbai",
  "Delhi",
  "Pune"
];

for (const index in cities) {

  console.log(
    "Index:",
    index,
    "City:",
    cities[index]
  );

}


// Output:
//
// Index: 0 City: Mumbai
// Index: 1 City: Delhi
// Index: 2 City: Pune


// ============================================================
// 12. for...in WITH OBJECT
// ============================================================

console.log("\n12. FOR...IN OBJECT");

const user = {
  name: "Satish",
  role: "QA",
  city: "Mumbai"
};

for (const key in user) {

  console.log(
    "Key:",
    key,
    "Value:",
    user[key as keyof typeof user]
  );

}


// Output:
//
// name Satish
// role QA
// city Mumbai


// ============================================================
// 13. for...of VS for...in
// ============================================================

console.log("\n13. FOR...OF VS FOR...IN");

const tools = [
  "Playwright",
  "Postman",
  "Jira"
];


// for...of -> VALUE

for (const tool of tools) {

  console.log(
    "for...of:",
    tool
  );

}


// for...in -> INDEX

for (const index in tools) {

  console.log(
    "for...in:",
    index
  );

}


// Remember:
//
// for...of -> value
//
// for...in -> key/index


// ============================================================
// 14. forEach()
// ============================================================
//
// forEach is an ARRAY METHOD.
//
// It runs a function once for every array element.
//
// ============================================================

console.log("\n14. FOREACH");

const candidates = [
  "Satish",
  "Rahul",
  "Amit"
];

candidates.forEach((candidate) => {

  console.log(
    "Candidate:",
    candidate
  );

});


// ============================================================
// 15. forEach() WITH INDEX
// ============================================================

console.log("\n15. FOREACH WITH INDEX");

candidates.forEach(
  (candidate, index) => {

    console.log(
      index,
      candidate
    );

  }
);


// ============================================================
// 16. forEach() WITH ARRAY
// ============================================================

console.log("\n16. FOREACH NUMBERS");

const scores = [
  80,
  90,
  70
];

scores.forEach(
  (score, index) => {

    console.log(
      `Student ${index + 1}: ${score}`
    );

  }
);


// ============================================================
// 17. forEach() WITH CONDITION
// ============================================================

console.log("\n17. FOREACH + IF");

scores.forEach(
  (score) => {

    if (score >= 80) {

      console.log(
        "High score:",
        score
      );

    }

  }
);


// ============================================================
// 18. WHILE LOOP
// ============================================================
//
// Syntax:
//
// while (condition) {
//     code
// }
//
// The condition is checked BEFORE execution.
//
// ============================================================

console.log("\n18. WHILE LOOP");

let count = 0;

while (count < 5) {

  console.log(
    "Count:",
    count
  );

  count++;

}


// ============================================================
// 19. WHILE LOOP WITH ARRAY
// ============================================================

console.log("\n19. WHILE + ARRAY");

const employees = [
  "Satish",
  "Rahul",
  "Amit"
];

let employeeIndex = 0;

while (employeeIndex < employees.length) {

  console.log(
    employees[employeeIndex]
  );

  employeeIndex++;

}


// ============================================================
// 20. IMPORTANT: AVOID INFINITE LOOP
// ============================================================

// DON'T DO THIS:
//
// let i = 0;
//
// while (i < 5) {
//   console.log(i);
// }
//
// i never changes.
//
// Therefore:
//
// i < 5
//
// always remains true.
//
// Always make sure the condition eventually becomes false.


// ============================================================
// 21. DO...WHILE LOOP
// ============================================================
//
// do...while runs AT LEAST ONCE.
//
// ============================================================

console.log("\n21. DO WHILE");

let number = 0;

do {

  console.log(
    "Number:",
    number
  );

  number++;

} while (number < 5);


// ============================================================
// 22. while VS do...while
// ============================================================

console.log("\n22. WHILE VS DO WHILE");

let x = 10;

while (x < 5) {

  console.log(
    "while:",
    x
  );

}


// This DOES NOT execute.
//
// Because:
// 10 < 5 -> false


let y = 10;

do {

  console.log(
    "do while:",
    y
  );

} while (y < 5);


// This executes ONCE.
//
// Because do...while executes first,
// then checks the condition.


// ============================================================
// 23. BREAK
// ============================================================
//
// break = STOP THE LOOP COMPLETELY.
//
// ============================================================

console.log("\n23. BREAK");

for (let i = 1; i <= 10; i++) {

  if (i === 5) {
    break;
  }

  console.log(i);

}


// Output:
//
// 1
// 2
// 3
// 4
//
// At 5 -> break -> loop stops.


// ============================================================
// 24. CONTINUE
// ============================================================
//
// continue = SKIP CURRENT ITERATION.
//
// ============================================================

console.log("\n24. CONTINUE");

for (let i = 1; i <= 5; i++) {

  if (i === 3) {
    continue;
  }

  console.log(i);

}


// Output:
//
// 1
// 2
// 4
// 5
//
// 3 was skipped.


// ============================================================
// 25. BREAK WITH for...of
// ============================================================

console.log("\n25. BREAK WITH FOR...OF");

const users2 = [
  "Satish",
  "Rahul",
  "Amit",
  "Rohit"
];

for (const userName of users2) {

  if (userName === "Amit") {
    break;
  }

  console.log(
    userName
  );

}


// ============================================================
// 26. CONTINUE WITH for...of
// ============================================================

console.log("\n26. CONTINUE WITH FOR...OF");

for (const userName of users2) {

  if (userName === "Amit") {
    continue;
  }

  console.log(
    userName
  );

}


// ============================================================
// 27. NESTED LOOP
// ============================================================
//
// A loop inside another loop.
//
// ============================================================

console.log("\n27. NESTED LOOP");

for (let i = 1; i <= 3; i++) {

  for (let j = 1; j <= 3; j++) {

    console.log(
      `i=${i}, j=${j}`
    );

  }

}


// Output:
//
// i=1,j=1
// i=1,j=2
// i=1,j=3
// i=2,j=1
// i=2,j=2
// i=2,j=3
// etc.


// ============================================================
// 28. NESTED ARRAY LOOP
// ============================================================

console.log("\n28. NESTED ARRAY");

const departments = [
  [
    "Satish",
    "Rahul"
  ],
  [
    "Amit",
    "Rohit"
  ]
];

for (const department of departments) {

  for (const employee of department) {

    console.log(
      employee
    );

  }

}


// ============================================================
// 29. LOOP THROUGH OBJECT ARRAY
// ============================================================

console.log("\n29. OBJECT ARRAY");

const candidateData = [
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

for (const candidate of candidateData) {

  console.log(
    "Name:",
    candidate.name,
    "Score:",
    candidate.score
  );

}


// ============================================================
// 30. LOOP + CONDITION + OBJECT
// ============================================================

console.log("\n30. FIND HIGH SCORERS");

for (const candidate of candidateData) {

  if (candidate.score >= 80) {

    console.log(
      candidate.name,
      "passed"
    );

  }

}


// ============================================================
// 31. REAL QA EXAMPLE
// CHECK ALL REQUIRED LOCATIONS
// ============================================================

console.log("\n31. REQUIRED LOCATIONS");

const requiredLocations = [
  "Thane",
  "Mulund",
  "Nahur",
  "Bhandup",
  "Ghatkopar"
];

for (const location of requiredLocations) {

  console.log(
    "Checking location:",
    location
  );

}


// ============================================================
// 32. REAL QA EXAMPLE
// CHECK CANDIDATES
// ============================================================

console.log("\n32. CHECK CANDIDATES");

const candidateLocations = [
  "Thane",
  "Andheri",
  "Mulund",
  "Pune"
];

for (const location of candidateLocations) {

  if (
    requiredLocations.includes(location)
  ) {

    console.log(
      location,
      "-> ACCEPTED"
    );

  } else {

    console.log(
      location,
      "-> REJECTED"
    );

  }

}


// ============================================================
// 33. REAL PLAYWRIGHT-STYLE LOOP
// ============================================================
//
// Imagine you have multiple tabs:
//
// All
// Draft
// Needs Setup
// Scoring On
//
// ============================================================

console.log("\n33. PLAYWRIGHT-STYLE LOOP");

const tabs = [
  "All",
  "Draft",
  "Needs Setup",
  "Scoring On"
];

for (const tab of tabs) {

  console.log(
    `Checking tab: ${tab}`
  );

  // Example:
  //
  // await page.getByRole("tab", {
  //   name: tab
  // }).click();
  //
  // await expect(...).toBeVisible();

}


// ============================================================
// 34. PLAYWRIGHT-STYLE for LOOP
// ============================================================

console.log("\n34. PLAYWRIGHT FOR LOOP");

for (let i = 0; i < tabs.length; i++) {

  const tab = tabs[i];

  console.log(
    `Checking tab ${i}: ${tab}`
  );

  // await page.getByRole("tab", {
  //   name: tab
  // }).click();

}


// ============================================================
// 35. PLAYWRIGHT forEach
// ============================================================

// IMPORTANT:
//
// You should be careful with:
//
// tabs.forEach(async (tab) => {
//   await page.click(...);
// });
//
// forEach DOES NOT properly wait for async callbacks.
//
// Prefer:
//
// for (const tab of tabs) {
//   await page.click(...);
// }
//
// when you need sequential async Playwright actions.


// ============================================================
// 36. ASYNC LOOP - RECOMMENDED
// ============================================================

async function checkTabs() {

  const tabs = [
    "All",
    "Draft",
    "Needs Setup",
    "Scoring On"
  ];

  for (const tab of tabs) {

    console.log(
      `Checking ${tab}`
    );

    // Example:
    //
    // await page.getByRole("tab", {
    //   name: tab
    // }).click();
    //
    // await page.waitForTimeout(500);

  }
}

await checkTabs();


// ============================================================
// 37. ASYNC for...of
// ============================================================

async function processCandidates() {

  const candidates = [
    "Satish",
    "Rahul",
    "Amit"
  ];

  for (const candidate of candidates) {

    console.log(
      `Processing ${candidate}`
    );

    await new Promise(
      resolve => setTimeout(resolve, 500)
    );

  }

}

await processCandidates();


// ============================================================
// 38. ASYNC for LOOP
// ============================================================

async function processNumbers() {

  for (let i = 1; i <= 3; i++) {

    console.log(
      `Processing ${i}`
    );

    await new Promise(
      resolve => setTimeout(resolve, 500)
    );

  }

}

await processNumbers();


// ============================================================
// 39. ASYNC forEach - DON'T USE LIKE THIS
// ============================================================

// Avoid this when order/waiting matters:
//
// const users3 = ["A", "B", "C"];
//
// users3.forEach(async (user) => {
//
//   await someAsyncFunction(user);
//
// });
//
// The outer code will NOT wait for these callbacks
// the way you might expect.


// ============================================================
// 40. CORRECT ASYNC APPROACH
// ============================================================

async function correctAsyncLoop() {

  const users3 = [
    "A",
    "B",
    "C"
  ];

  for (const user of users3) {

    console.log(
      `Processing ${user}`
    );

    await new Promise(
      resolve => setTimeout(resolve, 300)
    );

  }
}

await correctAsyncLoop();


// ============================================================
// 41. LOOP + BREAK IN REAL QA
// ============================================================
//
// Search candidates until we find Satish.
//
// ============================================================

console.log("\n41. SEARCH UNTIL FOUND");

const candidates3 = [
  "Rahul",
  "Amit",
  "Satish",
  "Rohit"
];

for (const candidate of candidates3) {

  console.log(
    "Checking:",
    candidate
  );

  if (candidate === "Satish") {

    console.log(
      "FOUND SATISH"
    );

    break;
  }

}


// ============================================================
// 42. LOOP + CONTINUE IN REAL QA
// ============================================================
//
// Skip rejected candidates.
//
// ============================================================

console.log("\n42. SKIP REJECTED");

const candidateStatuses = [
  "approved",
  "rejected",
  "approved",
  "rejected",
  "approved"
];

for (const status of candidateStatuses) {

  if (status === "rejected") {

    continue;

  }

  console.log(
    "Processing:",
    status
  );

}


// ============================================================
// 43. LOOP THROUGH OBJECT KEYS
// ============================================================

console.log("\n43. OBJECT KEYS");

const config = {
  browser: "chromium",
  headless: false,
  baseURL: "https://example.com"
};

for (const key of Object.keys(config)) {

  console.log(
    "Key:",
    key
  );

}


// ============================================================
// 44. LOOP THROUGH OBJECT VALUES
// ============================================================

console.log("\n44. OBJECT VALUES");

for (const value of Object.values(config)) {

  console.log(
    "Value:",
    value
  );

}


// ============================================================
// 45. LOOP THROUGH OBJECT ENTRIES
// ============================================================

console.log("\n45. OBJECT ENTRIES");

for (const [key, value] of Object.entries(config)) {

  console.log(
    `${key}: ${value}`
  );

}


// ============================================================
// 46. for...of + DESTRUCTURING
// ============================================================

console.log("\n46. FOR OF DESTRUCTURING");

const employees3 = [
  {
    name: "Satish",
    role: "QA"
  },
  {
    name: "Rahul",
    role: "Developer"
  }
];

for (const { name, role } of employees3) {

  console.log(
    `${name} -> ${role}`
  );

}


// ============================================================
// 47. LOOP WITH MULTIPLE CONDITIONS
// ============================================================

console.log("\n47. MULTIPLE CONDITIONS");

const scores3 = [
  45,
  80,
  95,
  60,
  30
];

for (const score of scores3) {

  if (score >= 90) {

    console.log(
      score,
      "-> Excellent"
    );

  } else if (score >= 70) {

    console.log(
      score,
      "-> Good"
    );

  } else if (score >= 50) {

    console.log(
      score,
      "-> Average"
    );

  } else {

    console.log(
      score,
      "-> Failed"
    );

  }

}


// ============================================================
// 48. LOOP WITH COUNTER
// ============================================================

console.log("\n48. COUNTER");

const results2 = [
  "passed",
  "failed",
  "passed",
  "passed",
  "failed"
];

let passedCount = 0;
let failedCount = 0;

for (const result of results2) {

  if (result === "passed") {

    passedCount++;

  } else {

    failedCount++;

  }

}

console.log(
  "Passed:",
  passedCount
);

console.log(
  "Failed:",
  failedCount
);


// ============================================================
// 49. LOOP + TOTAL
// ============================================================

console.log("\n49. TOTAL");

const salaries = [
  300000,
  400000,
  500000
];

let total = 0;

for (const salary of salaries) {

  total += salary;

}

console.log(
  "Total:",
  total
);


// ============================================================
// 50. FINAL CHEAT SHEET
// ============================================================

console.log(`
============================================================
LOOP CHEAT SHEET
============================================================

1. for
------------------------------------------------------------
Use when you need index/control.

for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
}


2. for...of
------------------------------------------------------------
Use when you need VALUES.

for (const item of array) {
    console.log(item);
}


3. for...in
------------------------------------------------------------
Use when you need KEYS / INDEXES.

for (const key in object) {
    console.log(key);
}


4. forEach
------------------------------------------------------------
Array method for every item.

array.forEach((item) => {
    console.log(item);
});


5. while
------------------------------------------------------------
Runs while condition is true.

while (condition) {
    ...
}


6. do...while
------------------------------------------------------------
Runs AT LEAST ONCE.

do {
    ...
} while (condition);


7. break
------------------------------------------------------------
STOP the loop completely.


8. continue
------------------------------------------------------------
SKIP current iteration.


============================================================
MOST IMPORTANT DIFFERENCE
============================================================

for
    ↓
Need index/control

for...of
    ↓
Need value

for...in
    ↓
Need key/index

forEach
    ↓
Run something for every array item

while
    ↓
Continue while condition is true

do...while
    ↓
Run once BEFORE checking condition


============================================================
QA / PLAYWRIGHT RECOMMENDATION
============================================================

For normal array processing:

for (const item of items) {
    ...
}


For async Playwright operations:

for (const item of items) {
    await something(item);
}


Avoid:

items.forEach(async (item) => {
    await something(item);
});


============================================================
`);