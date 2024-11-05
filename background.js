// Create an alarm to trigger every hour (60 minutes)
chrome.alarms.create('hourlyReminder', { periodInMinutes: 60 }); // Every 60 minutes

// Add a listener for the alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'hourlyReminder') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png', // Ensure the icon path is correct
      title: 'Hourly Report Reminder',
      message: 'Don’t forget to submit your end-of-day report!',
      priority: 2
    });
  }
});
