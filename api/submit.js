import { google } from "googleapis";
import process from "process";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 🔍 Debug ENV (AMAN, tidak print full key)
    console.log("GOOGLE_SHEET_ID:", process.env.GOOGLE_SHEET_ID);
    console.log("GOOGLE_CLIENT_EMAIL exists?", !!process.env.GOOGLE_CLIENT_EMAIL);
    console.log("GOOGLE_PRIVATE_KEY length:", process.env.GOOGLE_PRIVATE_KEY?.length);

    const { name, email, phone, date, time, service } = req.body;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, email, phone, date, time, service, new Date().toISOString()]],
      },
    });

    return res.status(200).json({ success: true, message: "Appointment saved!" });
  } catch (error) {
    console.error("Error saving appointment:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
