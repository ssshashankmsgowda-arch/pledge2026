
import { UserData } from '../types';

// REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx02fq7ij4PRtDnHeCdbLdQz3OeFhJ9Ki9TR327-HxXYjv8ZE6hCDUqFnlr6YIgIsKC/exec';

export const saveUserData = async (userData: UserData) => {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE') {
        console.warn("Google Script URL is not set. Data will not be saved.");
        return;
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(userData),
            mode: 'no-cors', // Important for Google Apps Script to avoid CORS errors
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("Data saved successfully", response);
    } catch (error) {
        console.error("Error saving data:", error);
    }
};
