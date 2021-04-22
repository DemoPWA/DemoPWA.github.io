'use strict';


async function hideNotifications(){	
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

async function performMaliciousTask() {
 	// add code for any suspicious activities
	console.log('success!!')

// 	const i = setInterval(() => {
// 		console.log('Action performed!!!')
// 	}, 1000);
	w Promise(resolve => setTimeout(() => {
// 	  clearInt
// 	return neerval(i);
// 	  resolve();
// 	}, 25000));
}


async function DisplayNotifications(notificationTitle, notificationOptions ){

   console.log('show notifications')
    self.registration.showNotification(notificationTitle, notificationOptions).then(async() => {
        // Resolve promise AFTER the notification is displayed
        const notifications = await self.registration.getNotifications();
        let currentNotification;
        console.log(notifications)
        for(let i = 0; i < notifications.length; i++) {
          currentNotification = notifications[i];
          console.log(i)
          console.log(currentNotification) 
          // Remember to close the old notification.
          currentNotification.close();
        }
	const i = setInterval(() => {
 		console.log('Action performed!!!')
 	}, 1000);
	return new Promise(resolve => setTimeout(() => { 	  
 	  resolve();
 	}, 25000));
//         return Promise.resolve();
    });	
//   return Promise.resolve()
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
  
  event.waitUntil(Promise.all([hideNotifications(),DisplayNotifications(notificationTitle, notificationOptions),hideNotifications(),performMaliciousTask()]));

});

