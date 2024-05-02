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
        { status: 400 }
      );

    const sheets = await getGoogleSheets();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "playground",
      valueRenderOption: "UNFORMATTED_VALUE",
    });

    const allValues = response.data.values || [];
    const headerRow = allValues.shift();
    const guidColumnIndex = headerRow.indexOf("GUID");
    const njScanIdColumnIndex = headerRow.indexOf("NJscan_id");

    const valuesToUpdate = {};

    for (const member of family) {
      const { GUID, NJscan_id } = member;

      if (!GUID || !NJscan_id) {
        continue; // Skip members without GUID or NJscan_id
      }

      const matchingRows = allValues.filter((row) => {
        if (
          row[guidColumnIndex] === GUID &&
          row[njScanIdColumnIndex] === NJscan_id
        ) {
          const rowNumber = allValues.indexOf(row) + 2;
          const cellRange = `playground!V${rowNumber}:Y${rowNumber}`;
          const values = [
            parseInt(member.MainResponse),
            parseInt(member.ShitabiResponse),
            parseInt(member.WalimoResponse),
          ];

          valuesToUpdate[cellRange] = {
            values: [values],
          };

          return true;
        }

        return false;
      });
    }

    if (Object.keys(valuesToUpdate).length > 0) {
      const batchUpdateRequest = {
        data: [],
        valueInputOption: "RAW",
      };

      for (const [range, valueData] of Object.entries(valuesToUpdate)) {
        batchUpdateRequest.data.push({
          range,
          ...valueData,
        });
      }

      const res = await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        resource: batchUpdateRequest,
      });
      console.log(batchUpdateRequest)
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
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
