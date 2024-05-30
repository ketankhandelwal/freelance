require("dotenv").config();
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// Load the service account key file
const serviceAccountKeyFile = path.resolve(
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);
if (!fs.existsSync(serviceAccountKeyFile)) {
  throw new Error("Service account key file not found");
}

// Google Sheets ID
const SHEETS_ID = process.env.GOOGLE_SHEET_ID;

// Authenticate with Google Sheets API
const authenticateGoogleSheets = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const authClient = await auth.getClient();
  return google.sheets({ version: "v4", auth: authClient });
};

// Write data to Google Sheets
const writeToGoogleSheets = async (data) => {
  const sheets = await authenticateGoogleSheets();

  const rows = data.map((item) => [
    item.name,
    item.email,
    item.phone_no,
    item.religion,
    item.site_visit_date,
  ]);

  const response = sheets.spreadsheets.values.append({
    spreadsheetId: SHEETS_ID,
    range: "Sheet1!A1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: rows,
    },
  });

  return response;
};

const addDataToSheet = async (
  name,
  email,
  phone_no,
  religion,
  site_visit_date
) => {
  const data = [
    {
      name: name,
      email: email,
      phone_no: phone_no,
      religion: religion,
      site_visit_date: site_visit_date,
    },
  ];

  try {
    const res = await writeToGoogleSheets(data);
    return res;
  } catch (error) {
    console.error("Error writing data to Google Sheets:", error);
    return error;
  }
};

module.exports = {
  addDataToSheet,
};
