import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, phone, date, time, service } = req.body;

    // Auth pakai Service Account
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, phone, date, time, service, new Date().toISOString()]],
      },
    });

    return res.status(200).json({ message: "✅ Booking berhasil disimpan" });
  } catch (err) {
    console.error("❌ Error:", err);
    return res.status(500).json({ message: "Gagal simpan booking", error: err.message });
  }
}
