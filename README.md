# Quad Pulse Daily Report Chrome Extension

This Chrome extension helps users report their daily work progress. It provides a user-friendly interface that allows employees to report work either at the end of the day or after every hour.

## Features

- **End-of-Day Reporting**: Allows employees to submit a daily work report.
- **Hourly Reporting**: Option for users to report their work on an hourly basis.
- **Popup Interface**: A simple and accessible interface for users to fill out and submit their reports.
- **Background Tasks**: Continuous tracking in the background to handle scheduled tasks like notifications and data collection.

## Technologies Used

- **Frontend**: HTML, JavaScript (with Chrome extension APIs)
- **Chrome Extension APIs**: Used for background scripts, popups, and notifications.
- **Manifest File**: Configures the extension and permissions.
- **Popup**: Simple HTML interface for user interaction.

## Project Structure

```plaintext
quad_pulse_daily_report_chrome_extension/
├── background.js          # Script running in the background
├── manifest.json          # Extension's configuration file
├── popup.html             # HTML for the popup interface
├── popup.js               # JavaScript for popup functionality
└── icons/                 # Icons for the extension
    ├── icon16.png
    ├── icon48.png
    └── icon128.png

Installation
To install and use the extension, follow these steps:

1. Clone the repository
git clone https://github.com/quadcode-shivam/quad_pulse_daily_report_chrome_ext_backend.git
cd quad_pulse_daily_report_chrome_extension

Here's the complete README.md file for your Chrome Extension project, including details for all the files you mentioned: manifest.json, background.js, popup.html, popup.js, and other related information.

markdown
Copy code
# Quad Pulse Daily Report Chrome Extension

This Chrome extension helps users report their daily work progress. It provides a user-friendly interface that allows employees to report work either at the end of the day or after every hour.

## Features

- **End-of-Day Reporting**: Allows employees to submit a daily work report.
- **Hourly Reporting**: Option for users to report their work on an hourly basis.
- **Popup Interface**: A simple and accessible interface for users to fill out and submit their reports.
- **Background Tasks**: Continuous tracking in the background to handle scheduled tasks like notifications and data collection.

## Technologies Used

- **Frontend**: HTML, JavaScript (with Chrome extension APIs)
- **Chrome Extension APIs**: Used for background scripts, popups, and notifications.
- **Manifest File**: Configures the extension and permissions.
- **Popup**: Simple HTML interface for user interaction.

## Project Structure

```plaintext
quad_pulse_daily_report_chrome_extension/
├── background.js          # Script running in the background
├── manifest.json          # Extension's configuration file
├── popup.html             # HTML for the popup interface
├── popup.js               # JavaScript for popup functionality
└── icons/                 # Icons for the extension
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
Installation
To install and use the extension, follow these steps:

1. Clone the repository
bash
Copy code
git clone https://github.com/quadcode-shivam/quad_pulse_daily_report_chrome_ext_backend.git
cd quad_pulse_daily_report_chrome_extension
2. Load the extension in Chrome
Open Chrome and navigate to chrome://extensions/.
Enable Developer Mode by toggling the switch in the top-right corner.
Click on Load unpacked and select the directory where you cloned the repository.
The extension should now appear in your browser, and the icon will be visible in the Chrome toolbar.

Files Breakdown
1. manifest.json
The manifest.json file is the configuration file for the Chrome extension. It defines important metadata, permissions, and scripts needed by the extension.

{
  "manifest_version": 2,
  "name": "Quad Pulse Daily Report",
  "description": "Submit your daily or hourly work report.",
  "version": "1.0",
  "permissions": [
    "activeTab",
    "storage",
    "alarms"
  ],
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}


permissions: activeTab, storage, and alarms are requested for interacting with the active tab, saving data, and managing scheduled events.
background: Runs background.js, which handles ongoing background tasks such as periodic reporting.
2. background.js
The background.js file contains background logic such as setting up alarms to remind the user to report their work.

// Set an alarm to trigger the reporting reminder every hour
chrome.alarms.create('reportReminder', {
  periodInMinutes: 60
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'reportReminder') {
    // Trigger an action, like showing a notification or opening the popup
    chrome.browserAction.openPopup();
  }
});


This script handles saving the user's report to local storage when they click the "Submit Report" button.

Usage
Popup: Click the extension icon to open the popup and submit your daily or hourly report.
Background: The background script will trigger reminders every hour, prompting users to submit a report.
License
This project does not have a specific open-source license. Feel free to modify and use it according to your needs.

Contributing
If you'd like to contribute, feel free to fork the repository and submit a pull request. Make sure to follow the existing coding style and add appropriate comments and documentation.


### Key Sections:
1. **Technologies Used**: Lists the tech stack used to develop the Chrome extension.
2. **Installation**: Instructions on how to install and use the Chrome extension.
3. **File Breakdown**: Explains the purpose of each file:
   - `manifest.json`: Configuration for the Chrome extension.
   - `background.js`: Contains background logic, including alarms and notifications.
   - `popup.html`: The HTML structure for the popup interface.
   - `popup.js`: JavaScript to handle user interactions in the popup.
4. **Usage**: Explains how the extension functions and how users can interact with it.
5. **Contributing**: Guidance on contributing to the project.

This **README.md** will help developers and users understand how to use and extend the **Quad Pulse Daily Report Chrome Extension**.
