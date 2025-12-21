const themeColor = {
  lightPrimary: "",
  darkPrimary: "#0A0A0A",
  lightSecondary: "",
  darkSecondary: "#101010",
  lightAccent: "",
  darkAccent: "#F66720",
  lightTextPrimary: "#000000",
  darkTextPrimary: "#E8E8E8",
  lightTextSecondary: "#838383",
  darkTextSecondary: "#808085",
  lightError: "",
  darkError: "#ff5e00",
  lightSuccess: "",
  darkSuccess: "#46CF16",
};

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

const quarterMonth = [
  {
    quarterId: 0,
    months: ["january", "february", "march"],
  },
  {
    quarterId: 1,
    months: ["april", "may", "june"],
  },
  {
    quarterId: 2,
    months: ["july", "august", "september"],
  },
  {
    quarterId: 3,
    months: ["october", "november", "december"],
  },
];

const creamyCoolColors = [
  "#B0BEC5", // Light Blue Grey
  "#A8B9C8", // Muted Icy Blue
  "#D7CCC8", // Light Warm Grey
  "#C5CAE9", // Soft Lavender Blue
  "#B2DFDB", // Creamy Teal
  "#E0F2F1", // Ultra-light Mint
  "#D1C4E9", // Light Purple Tint
  "#F0EBE3", // Creamy Beige
  "#E3F2FD", // Frosted Blue
  "#ECEFF1", // Misty Grey
];

const colorCode = [
  // {
  //   primary: "#5eff4e",
  //   secondary: "#5eff4e2e",
  // },
  // {
  //   primary: "#c0ff4e",
  //   secondary: "#c0ff4e2e",
  // },
  // {
  //   primary: "#fff94e",
  //   secondary: "#fff94e2e",
  // },
  // {
  //   primary: "#ffc04e",
  //   secondary: "#ffc04e2e",
  // },
  // {
  //   primary: "#ff754e",
  //   secondary: "#ff754e2e",
  // },
  // {
  //   primary: "#4effdc",
  //   secondary: "#4effdc2e",
  // },
  // {
  //   primary: "#4ec4ff",
  //   secondary: "#4ec4ff2e",
  // },
  // {
  //   primary: "#a54eff",
  //   secondary: "#a54eff2e",
  // },
  // {
  //   primary: "#f94eff",
  //   secondary: "#f94eff2e",
  // },
  // {
  //   primary: "#878787",
  //   secondary: "#8787872e",
  // },
  // { primary: "#A3E4DB", secondary: "rgba(163, 228, 219, 0.4)" },
  // { primary: "#FFD3B4", secondary: "rgba(255, 211, 180, 0.4)" },
  // { primary: "#FFAAA7", secondary: "rgba(255, 170, 167, 0.4)" },
  // { primary: "#D5AAFF", secondary: "rgba(213, 170, 255, 0.4)" },
  // { primary: "#FFC1CC", secondary: "rgba(255, 193, 204, 0.4)" },
  // { primary: "#B5EAEA", secondary: "rgba(181, 234, 234, 0.4)" },
  // { primary: "#FFDAC1", secondary: "rgba(255, 218, 193, 0.4)" },
  // { primary: "#E2F0CB", secondary: "rgba(226, 240, 203, 0.4)" },
  // { primary: "#CBAACB", secondary: "rgba(203, 170, 203, 0.4)" },
  // { primary: "#F3C5FF", secondary: "rgba(243, 197, 255, 0.4)" },
  // { primary: "#FFD6A5", secondary: "rgba(255, 214, 165, 0.4)" },
  // { primary: "#BDE0FE", secondary: "rgba(189, 224, 254, 0.4)" },
  // { primary: "#B5E48C", secondary: "rgba(181, 228, 140, 0.4)" },
  // -----------
  // { primary: "#7DD8C2", secondary: "rgba(125, 216, 194, 0.4)" },
  // { primary: "#FFB677", secondary: "rgba(255, 182, 119, 0.4)" },
  // { primary: "#FF7A75", secondary: "rgba(255, 122, 117, 0.4)" },
  // { primary: "#B084F5", secondary: "rgba(176, 132, 245, 0.4)" },
  // { primary: "#FF9EB3", secondary: "rgba(255, 158, 179, 0.4)" },
  // { primary: "#6FDCDC", secondary: "rgba(111, 220, 220, 0.4)" },
  // { primary: "#FFC38B", secondary: "rgba(255, 195, 139, 0.4)" },
  // { primary: "#C6E48B", secondary: "rgba(198, 228, 139, 0.4)" },
  // { primary: "#D69BC9", secondary: "rgba(214, 155, 201, 0.4)" },
  // { primary: "#E39EFF", secondary: "rgba(227, 158, 255, 0.4)" },
  // { primary: "#FFB96D", secondary: "rgba(255, 185, 109, 0.4)" },
  // { primary: "#88C9FF", secondary: "rgba(136, 201, 255, 0.4)" },
  // { primary: "#A6E979", secondary: "rgba(166, 233, 121, 0.4)" },
  // --------------
  { primary: "#F5F5F5", secondary: "rgba(245, 245, 245, 0.4)" }, // White
  { primary: "#A0B4FF", secondary: "rgba(160, 180, 255, 0.4)" }, // Soft Blue
  { primary: "#6C7BFF", secondary: "rgba(108, 123, 255, 0.4)" }, // Bright Blue
  { primary: "#7A5CFF", secondary: "rgba(122, 92, 255, 0.4)" }, // Blue-Purple
  { primary: "#8B50FF", secondary: "rgba(139, 80, 255, 0.4)" }, // Mid Purple
  { primary: "#A356FF", secondary: "rgba(163, 86, 255, 0.4)" }, // Bright Purple
  { primary: "#B24CFF", secondary: "rgba(178, 76, 255, 0.4)" }, // Pinkish Purple
  { primary: "#FF73B3", secondary: "rgba(255, 115, 179, 0.4)" }, // Pink
  { primary: "#FF8F6C", secondary: "rgba(255, 143, 108, 0.4)" }, // Soft Orange
  { primary: "#FFD766", secondary: "rgba(255, 215, 102, 0.4)" }, // Yellow
  { primary: "#7ED957", secondary: "rgba(126, 217, 87, 0.4)" }, // Green
  { primary: "#6FDCDC", secondary: "rgba(111, 220, 220, 0.4)" }, // Aqua
  { primary: "#7BDFFF", secondary: "rgba(123, 223, 255, 0.4)" }, // Sky Blue
];

const temp = [
  {
    transactionName: "Restaurant Bill",
    transactionID: "TRN-1723652876611-0",
    transactionDate: "13/08/2025",
    transactionMode: "Credit Card",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-0.pdf",
    transactionAmount: 425.2,
    transactionCategory: "Food",
  },
  {
    transactionName: "Online Purchase",
    transactionID: "TRN-1723652876611-1",
    transactionDate: "05/07/2025",
    transactionMode: "Debit Card",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-1.pdf",
    transactionAmount: 1850.75,
    transactionCategory: "Shopping",
  },
  {
    transactionName: "Freelance Payment",
    transactionID: "TRN-1723652876611-2",
    transactionDate: "20/07/2025",
    transactionMode: "Net Banking",
    transactionType: "Income",
    transactionBillURL: "https://example.com/bill/1723652876611-2.pdf",
    transactionAmount: 8500.0,
    transactionCategory: "Income",
  },
  {
    transactionName: "Movie Ticket",
    transactionID: "TRN-1723652876611-3",
    transactionDate: "03/06/2025",
    transactionMode: "UPI",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-3.pdf",
    transactionAmount: 280.0,
    transactionCategory: "Entertainment",
  },
  {
    transactionName: "Supermarket Purchase",
    transactionID: "TRN-1723652876611-4",
    transactionDate: "28/06/2025",
    transactionMode: "Cash",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-4.pdf",
    transactionAmount: 910.5,
    transactionCategory: "Grocery",
  },
  {
    transactionName: "Pharmacy Bill",
    transactionID: "TRN-1723652876611-5",
    transactionDate: "10/07/2025",
    transactionMode: "Credit Card",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-5.pdf",
    transactionAmount: 550.0,
    transactionCategory: "Healthcare",
  },
  {
    transactionName: "Metro Ride",
    transactionID: "TRN-1723652876611-6",
    transactionDate: "01/08/2025",
    transactionMode: "UPI",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-6.pdf",
    transactionAmount: 85.0,
    transactionCategory: "Transport",
  },
  {
    transactionName: "Bus Ticket",
    transactionID: "TRN-1723652876611-7",
    transactionDate: "22/07/2025",
    transactionMode: "Debit Card",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-7.pdf",
    transactionAmount: 720.0,
    transactionCategory: "Travel",
  },
  {
    transactionName: "Streaming Service",
    transactionID: "TRN-1723652876611-8",
    transactionDate: "05/06/2025",
    transactionMode: "Credit Card",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-8.pdf",
    transactionAmount: 399.0,
    transactionCategory: "Subscription",
  },
  {
    transactionName: "Electricity Bill",
    transactionID: "TRN-1723652876611-9",
    transactionDate: "15/06/2025",
    transactionMode: "Net Banking",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-9.pdf",
    transactionAmount: 1200.0,
    transactionCategory: "Bill",
  },
  {
    transactionName: "Course Fee",
    transactionID: "TRN-1723652876611-10",
    transactionDate: "08/07/2025",
    transactionMode: "UPI",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-10.pdf",
    transactionAmount: 4500.0,
    transactionCategory: "Education",
  },
  {
    transactionName: "Restaurant Bill",
    transactionID: "TRN-1723652876611-11",
    transactionDate: "02/08/2025",
    transactionMode: "Cash",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-11.pdf",
    transactionAmount: 180.5,
    transactionCategory: "Food",
  },
  {
    transactionName: "Online Purchase",
    transactionID: "TRN-1723652876611-12",
    transactionDate: "29/07/2025",
    transactionMode: "Debit Card",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-12.pdf",
    transactionAmount: 980.25,
    transactionCategory: "Shopping",
  },
  {
    transactionName: "Freelance Payment",
    transactionID: "TRN-1723652876611-13",
    transactionDate: "07/08/2025",
    transactionMode: "Net Banking",
    transactionType: "Income",
    transactionBillURL: "https://example.com/bill/1723652876611-13.pdf",
    transactionAmount: 12000.0,
    transactionCategory: "Income",
  },
  {
    transactionName: "Movie Ticket",
    transactionID: "TRN-1723652876611-14",
    transactionDate: "18/06/2025",
    transactionMode: "UPI",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-14.pdf",
    transactionAmount: 500.0,
    transactionCategory: "Entertainment",
  },
  {
    transactionName: "Supermarket Purchase",
    transactionID: "TRN-1723652876611-15",
    transactionDate: "11/07/2025",
    transactionMode: "Credit Card",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-15.pdf",
    transactionAmount: 750.0,
    transactionCategory: "Grocery",
  },
  {
    transactionName: "Pharmacy Bill",
    transactionID: "TRN-1723652876611-16",
    transactionDate: "04/08/2025",
    transactionMode: "Cash",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-16.pdf",
    transactionAmount: 230.75,
    transactionCategory: "Healthcare",
  },
  {
    transactionName: "Metro Ride",
    transactionID: "TRN-1723652876611-17",
    transactionDate: "25/06/2025",
    transactionMode: "UPI",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-17.pdf",
    transactionAmount: 120.0,
    transactionCategory: "Transport",
  },
  {
    transactionName: "Bus Ticket",
    transactionID: "TRN-1723652876611-18",
    transactionDate: "14/08/2025",
    transactionMode: "Debit Card",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-18.pdf",
    transactionAmount: 900.0,
    transactionCategory: "Travel",
  },
  {
    transactionName: "Streaming Service",
    transactionID: "TRN-1723652876611-19",
    transactionDate: "01/07/2025",
    transactionMode: "Credit Card",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-19.pdf",
    transactionAmount: 199.0,
    transactionCategory: "Subscription",
  },
  {
    transactionName: "Electricity Bill",
    transactionID: "TRN-1723652876611-20",
    transactionDate: "09/08/2025",
    transactionMode: "Net Banking",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-20.pdf",
    transactionAmount: 1800.0,
    transactionCategory: "Bill",
  },
  {
    transactionName: "Course Fee",
    transactionID: "TRN-1723652876611-21",
    transactionDate: "21/06/2025",
    transactionMode: "UPI",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-21.pdf",
    transactionAmount: 7500.0,
    transactionCategory: "Education",
  },
  {
    transactionName: "Restaurant Bill",
    transactionID: "TRN-1723652876611-22",
    transactionDate: "10/06/2025",
    transactionMode: "Cash",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-22.pdf",
    transactionAmount: 600.0,
    transactionCategory: "Food",
  },
  {
    transactionName: "Online Purchase",
    transactionID: "TRN-1723652876611-23",
    transactionDate: "07/07/2025",
    transactionMode: "Credit Card",
    transactionType: "Expense",
    transactionBillURL: "https://example.com/bill/1723652876611-23.pdf",
    transactionAmount: 2500.0,
    transactionCategory: "Shopping",
  },
  {
    transactionName: "Freelance Payment",
    transactionID: "TRN-1723652876611-24",
    transactionDate: "03/08/2025",
    transactionMode: "Net Banking",
    transactionType: "Income",
    transactionBillURL: "https://example.com/bill/1723652876611-24.pdf",
    transactionAmount: 5000.0,
    transactionCategory: "Income",
  },
];

export {
  themeColor,
  monthName,
  creamyCoolColors,
  colorCode,
  quarterMonth,
  temp,
};
