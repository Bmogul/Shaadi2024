import { NextResponse } from "next/server";
import { getGoogleSheets, getAuthClient } from "../../lib/google-sheets";

/*export default async function handler(req, res) {
  try {
    const sheets = await getGoogleSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "EmailWhatsapp",
    });

    res.status(200).json(response.data.values);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data from Google Sheets" });
  }
}*/
export async function POST(req) {
  try {
    console.log("posting");
    const { family } = await req.json();
    if (!family || family.length === 0)
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 },
      );

    const sheets = await getGoogleSheets();
    const ranges = [];

    // Get all values from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "playground",
      valueRenderOption: "UNFORMATTED_VALUE",
    });

    const allValues = response.data.values || [];
    // Get the header row
    const headerRow = allValues.shift();

    // Find the indices of the GUID and NJscan_id columns
    const guidColumnIndex = headerRow.indexOf("GUID");
    const njScanIdColumnIndex = headerRow.indexOf("NJscan_id");

    for (const member of family) {
      let range = "";
      const { GUID, NJscan_id } = member;

      if (!GUID || !NJscan_id) {
        continue; // Skip members without GUID or NJscan_id
      }

      // Find the matching row(s) based on GUID and NJscan_id

      const matchingRows = allValues.filter(async (row, rowIndex) => {
        if (
          row[guidColumnIndex] === GUID &&
          row[njScanIdColumnIndex] === NJscan_id
        ) {
          const rowNumber = rowIndex + 2;
          const cellRange = `playground!V${rowNumber}:Y${rowNumber}`;
          const values = [
            parseInt(member.MainResponse),
            parseInt(member.ShitabiResponse),
            parseInt(member.WalimoResponse),
          ];


          // Append values for each matching row
          const res = await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: cellRange,
            valueInputOption: "RAW",
            resource: {
              values: [values],
            },
          })

          //console.log(values)
          console.log([res.status, res.statusText, res.data, res.body])
          return true;
        }
        return false;
      });
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
    console.log(ranges);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Fail" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const guid = searchParams.get("guid");

    if (!guid)
      return NextResponse.json({ message: "Missing guid" }, { status: 400 });

    const sheets = await getGoogleSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "playground",
    });
    const rawData = response.data.values;
    const parsed = {};
    const keys = rawData.shift();
    console.log("KEYS", keys, "KEYS");

    rawData.forEach((row) => {
      const hofId = row[0];

      if (!parsed[hofId]) {
        // If a family object with this HOFID doesn't exist, create a new one
        parsed[hofId] = [];
      }

      const parsedRow = row.reduce((acc, value, index) => {
        acc[keys[index]] = value || null;
        return acc;
      }, {});

      parsed[hofId].push(parsedRow);
    });
    console.log(rawData[0]);
    //console.log("PARSED DATA", parsed);
    const familyData = parsed[guid] || [];

    return NextResponse.json(familyData);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
