/**
 * GOOGLE APPS SCRIPT — saves Contact Us / Make Appointment form
 * submissions into a Google Sheet.
 *
 * SETUP STEPS
 * 1. Go to https://sheets.google.com and create a new spreadsheet.
 *    In row 1, add these headers:
 *      Timestamp | First Name | Email | Phone | Subject | Comments
 *
 * 2. In the sheet, click Extensions > Apps Script.
 *
 * 3. Delete any code in the editor and paste everything below.
 *
 * 4. Click "Deploy" > "New deployment".
 *      - Click the gear icon next to "Select type" and choose "Web app".
 *      - Description: anything (e.g. "Contact form endpoint").
 *      - Execute as: "Me".
 *      - Who has access: "Anyone".
 *    Click "Deploy", then "Authorize access" and approve the permissions
 *    (you may see an "unverified app" warning — click Advanced > Go to
 *    project (unsafe), this is expected for your own script).
 *
 * 5. Copy the "Web app URL" shown after deployment. It looks like:
 *      https://script.google.com/macros/s/XXXXXXXX/exec
 *
 * 6. Paste that URL into GOOGLE_SCRIPT_URL at the top of ContactSection.jsx.
 *
 * NOTE: If you ever edit this script, you must create a "New deployment"
 * again (or use "Manage deployments" > Edit > New version) for changes
 * to take effect on the existing URL.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = e.parameter;

  sheet.appendRow([
    new Date(),
    data.firstName || "",
    data.email || "",
    data.phone || "",
    data.subject || "",
    data.comments || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
