// Replace this with your actual Google Apps Script Web App URL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxPpZ8S4s_SuKFjKbii6GWd00xg42JR4iicxgkbHhb_2SXyHD5exgILYcIs_yJnF5emaw/exec";

// Sheet names
const SHEET_USERS = "Users";
const SHEET_COURSES = "Courses";

/**
 * Helper function to fetch all data from a sheet
 * @param {string} sheetName - Name of the sheet
 * @returns {Array} - All rows of data
 */
function getSheetData(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  return sheet.getDataRange().getValues();
}

/**
 * Helper function to write data to a sheet
 * @param {string} sheetName - Name of the sheet
 * @param {Array} rowData - Data to write as a new row
 */
function writeDataToSheet(sheetName, rowData) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  sheet.appendRow(rowData);
}

/**
 * Sign up a new user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} - Success or failure message
 */
function signUp(email, password) {
  const users = getSheetData(SHEET_USERS);
  const userExists = users.some(row => row[0] === email);

  if (userExists) {
    return { success: false, message: "Email already registered." };
  }

  writeDataToSheet(SHEET_USERS, [email, password]);
  return { success: true, message: "User registered successfully." };
}

/**
 * Log in an existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} - Success or failure message
 */
function login(email, password) {
  const users = getSheetData(SHEET_USERS);
  const user = users.find(row => row[0] === email && row[1] === password);

  if (user) {
    return { success: true, message: "Login successful." };
  }
  return { success: false, message: "Invalid email or password." };
}

/**
 * Fetch all available courses
 * @returns {Array} - List of courses
 */
function getCourses() {
  const courses = getSheetData(SHEET_COURSES);
  return courses.slice(1).map(row => ({
    courseId: row[0],
    courseName: row[1],
    coach: row[2],
    startDate: row[3],
    endDate: row[4],
  }));
}

/**
 * Entry point for POST requests
 * @param {Object} e - Event parameter
 * @returns {ContentService} - JSON response
 */
function doPost(e) {
  const action = e.parameter.action;
  const email = e.parameter.email;
  const password = e.parameter.password;

  let output;

  if (action === "signUp") {
    output = signUp(email, password);
  } else if (action === "login") {
    output = login(email, password);
  } else if (action === "getCourses") {
    output = getCourses();
  } else {
    output = { success: false, message: "Invalid action." };
  }

  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
}

/**
 * Entry point for GET requests
 * @param {Object} e - Event parameter
 * @returns {ContentService} - HTML or JSON response
 */
function doGet(e) {
  return ContentService.createTextOutput(
    "Welcome to the Horse Riding Club API!"
  )
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*");
}
