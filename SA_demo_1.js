
importScripts('./scripts/libs/idb-keyval.js');
importScripts('./scripts/analytics-sw.js');


self.registration.onupdatefound = function () {
	var d = new Date()
	console.log('Update found ::')
	console.log(d)
}

function wait(ms) {
        // This is only to show
        const i = setInterval(() => console.log('is alive'), 1000);
        return new Promise(resolve => setTimeout(() => {
          clearInterval(i);
	  var d = new Date()
	  console.log(d)
          resolve();
        }, ms));
}

self.addEventListener('install', function(event) {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();
});

self.addEventListener('activate', event => {
	console.log('activated!!')
	// Don't wait too long or the worker will be killed and this does not work.
	event.waitUntil(wait(15000).then(() => {
		 self.registration.update();
	  }));
});

