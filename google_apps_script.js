
// ==========================================
// GOOGLE APPS SCRIPT CODE
// Copy and paste this into Extensions > Apps Script in your Google Sheet
// ==========================================

function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        const doc = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = doc.getSheetByName('Sheet1'); // Make sure your sheet name is 'Sheet1'

        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        const nextRow = sheet.getLastRow() + 1;

        // Parse the incoming JSON data
        const data = JSON.parse(e.postData.contents);

        // Prepare the row data based on headers
        // We expect headers: Timestamp, Full Name, Email, Phone, Resolution, Photo URL
        const newRow = [
            new Date(),                // Timestamp
            data.fullName,             // Full Name
            data.email,                // Email
            data.phone,                // Phone
            data.customPledge,         // Resolution Text
            data.photo ? "Photo Uploaded (Base64)" : "No Photo" // Photo status (optional, base64 is too large for cells usually)
        ];

        sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

function setup() {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName('Sheet1');

    // Create headers if they don't exist
    if (sheet.getLastRow() === 0) {
        const headers = [["Timestamp", "Full Name", "Email", "Phone", "Resolution", "Photo Status"]];
        sheet.getRange(1, 1, 1, headers[0].length).setValues(headers);
        sheet.getRange(1, 1, 1, headers[0].length).setFontWeight("bold");
        sheet.setFrozenRows(1);
    }
}
