// Create an alarm to trigger every minute (1 minute)
chrome.alarms.create('hourlyReminder', { periodInMinutes: 60 }); // Set to 1 for testing every minute

// Add a listener for the alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'hourlyReminder') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png', // Ensure the icon path is correct
      title: 'Reminder',
      message: 'Please Report your Pusuing or Completed Task ',
      priority: 2
    });
  }
});
