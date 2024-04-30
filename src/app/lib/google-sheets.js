import { google } from "googleapis";
import serviceAccount from "../../../secrets.json"

export const getGoogleSheets = async () => {
  console.log("\n\n\n", serviceAccount, "\n\n\n")
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({
    auth,
    version: "v4",
  });

  return sheets;
};
