
# 📊 How to Connect Google Sheets to Your Pledge App

Since your website is static (runs in the browser), you need a way to receive data. The best free way is to use a **Google Apps Script** Web App.

Follow these 5 steps to store every user pledge in your Google Sheet.

---

### Step 1: Create a Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a **Blank Spreadsheet**.
2. Name it "Pledge Data 2026" (or anything you like).
3. Rename the bottom tab from `Sheet1` to `Sheet1` (it should be default, but just double check).

### Step 2: Open Apps Script
1. In the top menu, go to **Extensions** > **Apps Script**.
2. A new tab will open with a code editor.

### Step 3: Paste the Code
1. Delete any code currently in the `Code.gs` file.
2. Copy and paste the **entire code** from the file `google_apps_script.js` in your project folder.
   *(I have already created this file for you in your project root)*.
3. Click the **Save** icon (floppy disk) or press `Cmd + S`.

### Step 4: Run Setup (Important!)
1. In the toolbar dropdown that says `myFunction` (or similar), change it to `setup`.
2. Click **Run**.
3. It will ask for permissions. Click **Review permissions** -> Choose your account -> **Advanced** -> **Go to (unsafe)** -> **Allow**.
   *(This is safe; you are authorizing your own script to access your own sheet)*.
4. Go back to your Sheet. You should now see the headers: **Timestamp, Full Name, Email, Phone, Resolution, Photo Status**.

### Step 5: Deploy as Web App
1. Top right blue button: **Deploy** > **New deployment**.
2. **Select type**: Click the gear icon ⚙️ > **Web app**.
3. **Description**: "Pledge API v1".
4. **Execute as**: `Me (your_email@gmail.com)`.
5. **Who has access**: **Anyone** (This is CRITICAL. It allows your website visitors to send data without logging in).
6. Click **Deploy**.
7. Copy the **Web App URL** (it ends in `/exec`).

---

### Final Step: Update Your Code
1. Open the file `components/DataStore.ts` in your project.
2. Replace the placeholder URL with your new Web App URL:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
3. Save the file.
4. Deploy your website again (push to git).

✅ **Done!** Every time someone clicks "Confirm & Finalize", their data will appear in your Google Sheet instantly.
