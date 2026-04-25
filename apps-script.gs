/**
 * Zodhya — Lead capture endpoint for Rohith's event QR page.
 *
 * SETUP (one-time, ~5 minutes)
 * ----------------------------
 * 1. Open https://sheets.google.com and create a new sheet named "Zodhya Event Leads".
 * 2. In the first row of "Sheet1", paste this header row exactly:
 *      Timestamp | Name | Company / Role | Email | Type | Note | Source | User Agent
 * 3. Click  Extensions → Apps Script.
 * 4. Delete the placeholder code, paste THIS ENTIRE FILE in, and save.
 * 5. Click  Deploy → New deployment → gear icon → "Web app".
 *      - Description: "Zodhya event lead intake"
 *      - Execute as:  Me  (your Google account)
 *      - Who has access:  Anyone
 *    Click Deploy. Authorize the script when prompted.
 * 6. Copy the "Web app URL" (ends in /exec).
 * 7. Open  rohith.html  and paste that URL into  ZODHYA_CONFIG.SHEETS_URL.
 *
 * That's it. Every form submit on rohith.html will append a row to the sheet.
 * (You can pin a header row, add filters, or pipe to email/Slack from the sheet.)
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    sheet.appendRow([
      new Date(),
      data.name    || "",
      data.company || "",
      data.email   || "",
      data.type    || "",
      data.note    || "",
      data.source  || "",
      data.ua      || ""
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: lets you sanity-check the deployment by opening the /exec URL in a browser.
function doGet() {
  return ContentService
    .createTextOutput("Zodhya lead endpoint is live.")
    .setMimeType(ContentService.MimeType.TEXT);
}
