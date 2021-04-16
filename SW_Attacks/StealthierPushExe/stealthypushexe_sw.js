'use strict';




async function performMaliciousTask() {
 	// add code for any suspicious activities
}


async function showAndHideNotifications(notificationTitle, notificationOptions ){

   console.log('show notifications')
   self.registration.showNotification(notificationTitle, notificationOptions)  
		
   console.log('Get Notification')
   const notifications = await self.registration.getNotifications();
	let currentNotification;
	console.log(notifications)
	for(let i = 0; i < notifications.length; i++) {
	  currentNotification = notifications[i];
	  console.log(i)
	  console.log(currentNotification) 
	  // Remember to close the old notification.
	  currentNotification.close();
	  console.log('Notification closed')
    }
	
  return Promise.resolve()
}

self.addEventListener('install', function(event) {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  // The promise that skipWaiting() returns can be safely ignored.
//   self.skipWaiting();
  console.log('activated');
});

self.addEventListener('push', async function (event) {
  console.log('Received push');
  var d = new Date();
  var t = d.getTime();
  var notificationTitle = 'Hello';
  var notificationOptions = {
    body: 'Thanks for sending this push msg.',
    icon: './images/logo-192x192.png',
    badge: './images/badge-72x72.png',
    tag: 'simple-push-demo-notification'+t,
    data: {
      url: ''
    }
  };

  if (event.data) {
    var dataText = event.data.text();
    notificationTitle = 'Received Payload';
    notificationOptions.body = 'Push data: \'' + dataText + '\'';
  }  
  
  event.waitUntil(Promise.all([showAndHideNotifications(notificationTitle, notificationOptions),performMaliciousTask()]));

});

