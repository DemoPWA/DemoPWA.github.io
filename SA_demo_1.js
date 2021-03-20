importScripts('./scripts/libs/idb-keyval.js');
importScripts('./scripts/analytics-sw.js');

self.addEventListener('fetch', function(event) {
  console.log("fetch event:", event.request.url);
});


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

self.addEventListener('activate', function(event){
   console.log('SW activated')
   self.registration.sync.register('foo');
   self.registration.sync.register('foo2');
   event.waitUntil(wait(25000).then(() => {
	  self.registration.sync.register('foo3');
   	 self.registration.update();
	   wait(22000).then(() => {
	   	self.registration.update();
		   wait(22000).then(() => {
		   console.log('third wait called')
		   })
	   })
   })
    );  
});

self.addEventListener('push', function(ev){
   console.log('Push event called!!')
	 ev.waitUntil(wait(25000).then(() => {
// 	  self.registration.sync.register('foo3');
   	 self.registration.update();
	   wait(22000).then(() => {
	   	self.registration.update();
		   wait(22000).then(() => {
		   console.log('third wait called')
		   })
	   })
   })
    );  
})

self.addEventListener('sync', function(ev){	
   self.registration.sync.register('foo');
   console.log('sync event called!!')
})
