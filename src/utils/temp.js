function getData(index) {
  const tempData = [
    { monthsIndex: [0, 1, 2], showRender: "Jan - Mar, ", quarterId: 0 },
    { monthsIndex: [3, 4, 5], showRender: "Apr - June, ", quarterId: 1 },
    { monthsIndex: [6, 7, 8], showRender: "July - Sept, ", quarterId: 2 },
    { monthsIndex: [9, 10, 11], showRender: "Oct - Dec, ", quarterId: 3 },
  ];

  if (index >= 0 && index <= 2) {
    return tempData[0];
  } else if (index >= 3 && index <= 5) {
    return tempData[1];
  } else if (index >= 6 && index <= 8) {
    return tempData[2];
  } else if (index >= 9 && index <= 11) {
    return tempData[3];
  }
}

[
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  ";",
  ":",
  "'",
  '"',
  "\\",
  "|",
  ",",
  "<",
  ".",
  ">",
  "/",
  "?",
  "`",
  "~",
];
