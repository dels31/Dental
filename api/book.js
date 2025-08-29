// api/book.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, phone, date, time, service } = req.body;

  try {
    // Kirim ke Google Apps Script
    const gsResponse = await fetch(
      "https://script.google.com/macros/s/AKfycbzSNTfi1B1ZwMHPFCqcBQlEkTRi9sijUnBI0RqKaELRHdDYktivNKfjhv5X99HwoWTDoQ/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, date, time, service }),
      }
    );

    const gsResult = await gsResponse.text();

    res.status(200).json({ status: "success", gsResult });
  } catch (err) {
    console.error("Proxy Error:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
}
