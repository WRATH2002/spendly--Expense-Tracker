// ---- Function to change the month index based on the direction (next or previous).
function changeMonthIndex(
  direction,
  currentMonthIndex,
  currentYear,
  setMonthIndex,
  setYear
) {
  if (direction === "next") {
    if (currentMonthIndex === 11) {
      setMonthIndex(0);
      setYear(currentYear + 1);
    } else {
      setMonthIndex(currentMonthIndex + 1);
    }
  } else if (direction === "previous") {
    if (currentMonthIndex === 0) {
      setMonthIndex(11);
      setYear(currentYear - 1);
    } else {
      setMonthIndex(currentMonthIndex - 1);
    }
  }
}

// ---- Function to get the current date and time in the format of "hh:mm am/pm" and "dd/mm/yyyy"
function getCurrentDateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
  let time = `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  let date =
    now.getDate() +
    "/" +
    parseInt(parseInt(now.getMonth()) + 1) +
    "/" +
    now.getFullYear();

  return { Time: time, Date: date };
}

// ---- Function to return the searched category from the categories array. If the searchText is empty, it returns the original categories array.
function returnSearchedCategory(categories, searchText) {
  if (searchText === "") {
    return categories;
  } else {
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredCategories;
  }
}

// ---- Function to get the total expense for the month. If there are no expenses, it returns 0. If the total is a decimal, it returns a string with two digits after decimal.
function getTotalExpenseForTheMonth(expenses, monthIndex, year) {
  let tempTotal = expenses.reduce((total, expense) => {
    const expenseDate = expense?.transactionDate.split("/");
    if (
      parseInt(expenseDate[1]) == monthIndex + 1 &&
      parseInt(expenseDate[2]) == year
    ) {
      total = total + parseFloat(expense.transactionAmount);
    }
    return total;
  }, 0.0);

  if (tempTotal.toString().includes(".")) {
    return tempTotal.toFixed(2);
  } else {
    return tempTotal.toString() + ".00";
  }
}

// ---- Function to get all the expenses for the active month. If there are no expenses, it returns an empty array.
function getExpensesForTheMonth(expenses, monthIndex, year) {
  if (expenses.length === 0) return [];
  return expenses.filter(
    (expense) =>
      parseInt(expense?.transactionDate.split("/")[1]) == monthIndex + 1 &&
      parseInt(expense?.transactionDate.split("/")[2]) == year
  );
}

// ---- Function to get the object with category as key and count and totalAmount as value for the month. If there are no expenses, it returns an empty object. If there are same top categories, it returns the category with more amount.the value is an object with `count` and `totalAmount` and `percentage` as keys.
function getCategoryWiseCountWithInfoForTheMonth(expenses, monthIndex, year) {
  let tempExpenseForTheMonth = getExpensesForTheMonth(
    expenses,
    monthIndex,
    year
  );

  let categoryWiseCount = {};

  tempExpenseForTheMonth.forEach((expense) => {
    const category = expense.transactionCategory.toLowerCase();
    if (!categoryWiseCount[category]) {
      categoryWiseCount[category] = {
        count: 0,
        totalAmount: 0,
      };
    }
    categoryWiseCount[category].count += 1;
    categoryWiseCount[category].totalAmount = parseFloat(
      (
        parseFloat(categoryWiseCount[category].totalAmount) +
        parseFloat(expense.transactionAmount)
      ).toFixed(2)
    );
  });

  // ---- Sort based on totalAmount (descending)
  const sortedEntries = Object.entries(categoryWiseCount).sort(
    (a, b) => b[1].totalAmount - a[1].totalAmount
  );

  // ---- Convert back to object
  let sortedCategoryWiseCount = Object.fromEntries(sortedEntries);

  // ---- Step 1: Get total of all totalAmounts
  const totalSum = Object.values(sortedCategoryWiseCount).reduce(
    (sum, category) => sum + category.totalAmount,
    0
  );

  // ---- Step 2: Add percentage to each category
  sortedCategoryWiseCount = Object.fromEntries(
    Object.entries(sortedCategoryWiseCount).map(([key, value]) => [
      key,
      {
        ...value,
        percentage: parseFloat(
          ((value.totalAmount / totalSum) * 100).toFixed(2)
        ),
      },
    ])
  );

  console.log("sortedCategoryWiseCount", sortedCategoryWiseCount);
  return sortedCategoryWiseCount;
}

// ---- Function to get the top category for the month. if there are no expenses, it returns null. if there are same top categories, it returns the category with more amount. returns the category name as a string
function getTopCategoryForTheMonth(expenses, monthIndex, year) {
  let categoryWiseCount = getCategoryWiseCountWithInfoForTheMonth(
    expenses,
    monthIndex,
    year
  );
  let topCategory = null;
  let maxAmount = 0;

  for (const cat in categoryWiseCount) {
    if (categoryWiseCount[cat].totalAmount > maxAmount) {
      maxAmount = categoryWiseCount[cat].totalAmount;
      topCategory = cat;
    }
  }
  return topCategory
    ? topCategory.charAt(0).toUpperCase() + topCategory.slice(1)
    : null;
}

// ---- Function to convert a number may it be as string or number to a string with commas and two digits after decimal. If the number is already having decimal then round of to two digits after decimal.
function formatNumberWithCommasAndTwoDigits(num) {
  if (typeof num === "string") {
    num = parseFloat(num);
  }
  if (isNaN(num)) {
    return "0.00";
  }
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ---- Function to only convert a number to a two digit after decimal string. If the number is already having decimal then round off to two digits after decimal.
function formatNumberWithOnlyTwoDigits(num) {
  return num;
}

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

// ---- Function to get month or quarter of the year or year based on selected option
function getMonthYearDetails(
  activeSearch, // option means `Monthly` or `Quarterly` or `Yearly`
  setActiveSearch, // function to change the data
  direction, // like it will go up or down; possible values , `Next` or `Previous`
  activeMonthly,
  setActiveMonthly,
  activeQuarterly,
  setActiveQuarterly,
  activeYearly,
  setActiveYearly
) {
  const monthQuartersIDs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
  ];
  const quarterResultShow = [
    "Jan - Mar, ",
    "Apr - June, ",
    "July - Sept, ",
    "Oct - Dec, ",
  ];
  const monthName = [
    { short: "Jan", full: "January" },
    { short: "Feb", full: "February" },
    { short: "Mar", full: "March" },
    { short: "Apr", full: "April" },
    { short: "May", full: "May" },
    { short: "June", full: "June" },
    { short: "July", full: "July" },
    { short: "Aug", full: "August" },
    { short: "Sept", full: "September" },
    { short: "Oct", full: "October" },
    { short: "Nov", full: "November" },
    { short: "Dec", full: "December" },
  ];

  // ---------------------------------------------------------------------------------------
  if (activeSearch == "Monthly") {
    if (direction === "next") {
      if (activeMonthly?.monthId === 11) {
        // ---- changing quarterly based on updated month index/id
        setActiveQuarterly({
          monthsIndex: monthQuartersIDs[0],
          showRender: `${quarterResultShow[0]}${activeMonthly?.year + 1}`,
          quarterId: 0,
          year: activeMonthly?.year + 1,
        });
        // ---- changing yearly based on updated monthly info; only applicable in this condition
        setActiveYearly({
          year: activeMonthly?.year + 1,
          showRender: `${activeMonthly?.year + 1}`,
        });
        // ---- changing monthly based on direcion `next`
        setActiveMonthly({
          monthId: 0,
          year: activeMonthly?.year + 1,
          showRender: `${monthName[0]?.full}, ${activeMonthly?.year + 1}`,
        });
      } else {
        // ---- changing quarterly based on updated month index/id
        setActiveQuarterly({
          monthsIndex: getData(activeMonthly?.monthId + 1)?.monthsIndex,
          showRender: `${getData(activeMonthly?.monthId + 1)?.showRender}${
            activeMonthly?.year
          }`,
          quarterId: getData(activeMonthly?.monthId + 1)?.quarterId,
          year: activeMonthly?.year,
        });
        // ---- changing monthly based on direcion `next`
        setActiveMonthly({
          monthId: activeMonthly?.monthId + 1,
          year: activeMonthly?.year,
          showRender: `${monthName[activeMonthly?.monthId + 1]?.full}, ${
            activeMonthly?.year
          }`,
        });
      }
    } else if (direction === "previous") {
      if (activeMonthly?.monthId <= 0) {
        // ---- changing quarterly based on updated month index/id
        setActiveQuarterly({
          monthsIndex: monthQuartersIDs[3],
          showRender: `${quarterResultShow[3]}${activeMonthly?.year - 1}`,
          quarterId: 3,
          year: activeMonthly?.year - 1,
        });
        // ---- changing yearly based on updated monthly info; only applicable in this condition
        setActiveYearly({
          year: activeMonthly?.year - 1,
          showRender: `${activeMonthly?.year - 1}`,
        });
        // ---- changing monthly based on direcion `previous`
        setActiveMonthly({
          monthId: 11,
          year: activeMonthly?.year - 1,
          showRender: `${monthName[11]?.full}, ${activeMonthly?.year - 1}`,
        });
      } else {
        // ---- changing quarterly based on updated month index/id
        setActiveQuarterly({
          monthsIndex: getData(activeMonthly?.monthId - 1)?.monthsIndex,
          showRender: `${getData(activeMonthly?.monthId - 1)?.showRender}${
            activeMonthly?.year
          }`,
          quarterId: getData(activeMonthly?.monthId - 1)?.quarterId,
          year: activeMonthly?.year,
        });
        // ---- changing monthly based on direcion `previous`
        setActiveMonthly({
          monthId: activeMonthly?.monthId - 1,
          year: activeMonthly?.year,
          showRender: `${monthName[activeMonthly?.monthId - 1]?.full}, ${
            activeMonthly?.year
          }`,
        });
      }
    }
  }
  // ---------------------------------------------------------------------------------------
  else if (activeSearch == "Quarterly") {
    if (direction === "next") {
      if (activeQuarterly.quarterId + 1 > 3) {
        setActiveMonthly({
          monthId: 0,
          year: activeQuarterly?.year + 1,
          showRender: `${monthName[0]?.full}, ${activeQuarterly?.year + 1}`,
        });
        setActiveYearly({
          year: activeQuarterly.year + 1, // year to perform operation based on that
          showRender: `${activeQuarterly.year + 1}`, // will be rendered on the website screen
        });
        setActiveQuarterly({
          monthsIndex: monthQuartersIDs[0],
          showRender: `${quarterResultShow[0]}${activeQuarterly?.year + 1}`,
          quarterId: 0,
          year: activeQuarterly?.year + 1,
        });
      } else {
        setActiveMonthly({
          monthId: (activeQuarterly?.quarterId + 1) * 3,
          year: activeQuarterly?.year,
          showRender: `${
            monthName[(activeQuarterly?.quarterId + 1) * 3]?.full
          }, ${activeQuarterly?.year}`,
        });
        setActiveQuarterly({
          monthsIndex: monthQuartersIDs[activeQuarterly?.quarterId + 1],
          showRender: `${quarterResultShow[activeQuarterly?.quarterId + 1]}${
            activeQuarterly?.year
          }`,
          quarterId: activeQuarterly?.quarterId + 1,
          year: activeQuarterly?.year,
        });
      }
    } else if (direction === "previous") {
      if (activeQuarterly.quarterId - 1 < 0) {
        setActiveMonthly({
          monthId: 9,
          year: activeQuarterly?.year - 1,
          showRender: `${monthName[9]?.full}, ${activeQuarterly?.year - 1}`,
        });
        setActiveYearly({
          year: activeQuarterly.year - 1, // year to perform operation based on that
          showRender: `${activeQuarterly.year - 1}`, // will be rendered on the website screen
        });
        setActiveQuarterly({
          monthsIndex: monthQuartersIDs[3],
          showRender: `${quarterResultShow[3]}${activeQuarterly?.year - 1}`,
          quarterId: 3,
          year: activeQuarterly?.year - 1,
        });
      } else {
        setActiveMonthly({
          monthId: (activeQuarterly?.quarterId - 1) * 3,
          year: activeQuarterly?.year,
          showRender: `${
            monthName[(activeQuarterly?.quarterId - 1) * 3]?.full
          }, ${activeQuarterly?.year}`,
        });
        setActiveQuarterly({
          monthsIndex: monthQuartersIDs[activeQuarterly?.quarterId - 1],
          showRender: `${quarterResultShow[activeQuarterly?.quarterId - 1]}${
            activeQuarterly?.year
          }`,
          quarterId: activeQuarterly?.quarterId - 1,
          year: activeQuarterly?.year,
        });
      }
    }
  }
  // ---------------------------------------------------------------------------------------
  else if (activeSearch == "Yearly") {
    if (direction == "next") {
      setActiveMonthly({
        monthId: activeMonthly?.monthId,
        year: activeMonthly?.year + 1,
        showRender: `${monthName[activeMonthly?.monthId]?.full}, ${
          activeMonthly?.year + 1
        }`,
      });
      setActiveQuarterly({
        monthsIndex: activeQuarterly?.monthsIndex,
        showRender: `${quarterResultShow[activeQuarterly?.quarterId]}${
          activeQuarterly?.year + 1
        }`,
        quarterId: activeQuarterly?.quarterId,
        year: activeQuarterly?.year + 1,
      });
      setActiveYearly({
        year: activeYearly.year + 1, // year to perform operation based on that
        showRender: `${activeYearly.year + 1}`, // will be rendered on the website screen
      });
    } else if (direction == "previous") {
      setActiveMonthly({
        monthId: activeMonthly?.monthId,
        year: activeMonthly?.year - 1,
        showRender: `${monthName[activeMonthly?.monthId]?.full}, ${
          activeQuarterly?.year - 1
        }`,
      });
      setActiveQuarterly({
        monthsIndex: activeQuarterly?.monthsIndex,
        showRender: `${quarterResultShow[activeQuarterly?.quarterId]}${
          activeQuarterly?.year - 1
        }`,
        quarterId: activeQuarterly?.quarterId,
        year: activeQuarterly?.year - 1,
      });
      setActiveYearly({
        year: activeYearly.year - 1, // year to perform operation based on that
        showRender: `${activeYearly.year - 1}`, // will be rendered on the website screen
      });
    }
  }
}

function getTransactionInfoWithDetail(transactions) {
  let categoryWiseInfo = {}; // done
  let highestTransaction = {}; // done
  let highestAmount = 0; // done
  let lowestAmount =
    transactions.length > 0 ? transactions[0].transactionAmount : 0; // done
  let lowestTransaction = {}; // done
  let totalExpense = 0; // done
  let totalTransactions = transactions.length; // done
  let topCategory = "";
  let topCategoryAmount = 0;

  transactions?.map((data) => {
    // ---- for highest transaction
    if (parseFloat(data?.transactionAmount) > highestAmount) {
      highestAmount = parseFloat(data?.transactionAmount);
      highestTransaction = data;
    }
    // ---- for lowest transaction
    if (parseFloat(data?.transactionAmount) < lowestAmount) {
      lowestAmount = parseFloat(data?.transactionAmount);
      lowestTransaction = data;
    }
    // ---- for total expense
    totalExpense = parseFloat(
      (parseFloat(totalExpense) + parseFloat(data?.transactionAmount)).toFixed(
        2
      )
    );
    // ---- for categorywiseinfo
    if (categoryWiseInfo[data?.transactionCategory]) {
      categoryWiseInfo[data?.transactionCategory] = {
        categoryName: categoryWiseInfo[data?.transactionCategory]?.categoryName,
        categoryTotalExpense: parseFloat(
          (
            parseFloat(
              categoryWiseInfo[data?.transactionCategory]?.categoryTotalExpense
            ) + parseFloat(data?.transactionAmount)
          ).toFixed(2)
        ),
        categoryTotalTransactions:
          categoryWiseInfo[data?.transactionCategory]
            ?.categoryTotalTransactions + 1,
      };
    } else {
      categoryWiseInfo[data?.transactionCategory] = {
        categoryName: data?.transactionCategory,
        categoryTotalExpense: data?.transactionAmount,
        categoryTotalTransactions: 1,
        // categoryPercentage : ,
      };
    }
  });

  for (const objData in categoryWiseInfo) {
    categoryWiseInfo[objData].categoryPercentage = parseFloat(
      (parseFloat(categoryWiseInfo[objData]?.categoryTotalExpense) /
        parseFloat(totalExpense)) *
        100
    ).toFixed(2);
    if (categoryWiseInfo[objData]?.categoryTotalExpense > topCategoryAmount) {
      topCategory = categoryWiseInfo[objData]?.categoryName;
      topCategoryAmount = categoryWiseInfo[objData]?.categoryTotalExpense;
    }
  }

  // ---- Sort based on totalAmount (descending)
  const sortedEntries = Object.entries(categoryWiseInfo).sort(
    (a, b) => b[1].categoryTotalExpense - a[1].categoryTotalExpense
  );

  // ---- Convert back to object
  let sortedCategoryWiseCount = Object.fromEntries(sortedEntries);

  return {
    topCategory: topCategory,
    highestTransaction: highestTransaction,
    lowestTransaction: lowestTransaction,
    totalTransactions: totalTransactions,
    totalExpense: totalExpense,
    expenseDistribution: [sortedCategoryWiseCount],
  };
}

function getPeriodWiseComparison(
  transactions,
  searchOption,
  activeMonthly,
  activeQuarterly,
  activeYearly
) {
  let tempCurrObject = {};
  let tempPrevObject = {};
  // -----------------------------------------------------------
  let tempCurrTransactions = [];
  let tempPrevTransactions = [];
  // -----------------------------------------------------------
  const tempQuarterIds = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ];
  // -----------------------------------------------------------
  let currMonths = [];
  let prevMonths = [];
  let currYear = 0;
  let prevYear = 0;
  // -----------------------------------------------------------
  if (searchOption == "Monthly") {
    currMonths.push(activeMonthly?.monthId + 1);
    prevMonths.push(activeMonthly?.monthId == 0 ? 12 : activeMonthly?.monthId);
    currYear = activeMonthly?.year;
    prevYear =
      activeMonthly?.monthId == 0
        ? activeMonthly?.year - 1
        : activeMonthly?.year;
  } else if (searchOption == "Quarterly") {
    currMonths = tempQuarterIds[activeQuarterly?.quarterId];
    prevMonths =
      activeQuarterly?.quarterId == 0
        ? tempQuarterIds[3]
        : tempQuarterIds[activeQuarterly?.quarterId - 1];
    currYear = activeQuarterly?.year;
    prevYear =
      activeQuarterly?.quarterId == 0
        ? activeQuarterly?.year - 1
        : activeQuarterly?.year;
  } else if (searchOption == "Yearly") {
    currYear = activeYearly?.year;
    prevYear = activeYearly?.year - 1;
  }
  // -----------------------------------------------------------
  if (transactions.length > 0 && searchOption == "Monthly") {
    transactions?.map((data, index) => {
      if (
        currMonths.includes(parseInt(data?.transactionDate?.split("/")[1])) &&
        currYear == parseInt(data?.transactionDate?.split("/")[2])
      ) {
        tempCurrTransactions.push(data);
      } else if (
        prevMonths.includes(parseInt(data?.transactionDate?.split("/")[1])) &&
        prevYear == parseInt(data?.transactionDate?.split("/")[2])
      ) {
        tempPrevTransactions.push(data);
      }
    });
  } else if (transactions.length > 0 && searchOption == "Quarterly") {
    transactions?.map((data, index) => {
      if (
        currMonths.includes(parseInt(data?.transactionDate?.split("/")[1])) &&
        currYear == parseInt(data?.transactionDate?.split("/")[2])
      ) {
        tempCurrTransactions.push(data);
      } else if (
        prevMonths.includes(parseInt(data?.transactionDate?.split("/")[1])) &&
        prevYear == parseInt(data?.transactionDate?.split("/")[2])
      ) {
        tempPrevTransactions.push(data);
      }
    });
  } else if (transactions.length > 0 && searchOption == "Yearly") {
    transactions?.map((data, index) => {
      if (currYear == parseInt(data?.transactionDate?.split("/")[2])) {
        tempCurrTransactions.push(data);
      } else if (prevYear == parseInt(data?.transactionDate?.split("/")[2])) {
        tempPrevTransactions.push(data);
      }
    });
  }
  // -----------------------------------------------------------
  tempCurrObject = getTransactionInfoWithDetail(tempCurrTransactions);
  tempPrevObject = getTransactionInfoWithDetail(tempPrevTransactions);

  console.log("bsoaboSB");
  console.log(tempCurrObject);
  console.log(tempPrevObject);
  return [tempCurrObject, tempPrevObject];
}

function requirementOnlyNumber(value) {
  if (value.length === 0) {
    return value;
  }
  if (value.length > 10) {
    return value.slice(0, 10);
  }
  if (!parseInt(value)) {
    return value.slice(0, -1);
  } else {
    return parseInt(value);
  }
}

function containInCharacterCount(value, maxCount) {
  if (value.length <= maxCount) {
    return value;
  } else {
    value = value.slice(0, maxCount);
    return value;
  }
}

export {
  changeMonthIndex,
  getCurrentDateTime,
  returnSearchedCategory,
  getTotalExpenseForTheMonth,
  getExpensesForTheMonth,
  getCategoryWiseCountWithInfoForTheMonth,
  getTopCategoryForTheMonth,
  formatNumberWithCommasAndTwoDigits,
  formatNumberWithOnlyTwoDigits,
  getMonthYearDetails,
  getData,
  getPeriodWiseComparison,
  requirementOnlyNumber,
  containInCharacterCount,
};
