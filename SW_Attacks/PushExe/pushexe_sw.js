
self.addEventListener('install', function(event) {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
   console.log('SW activated')
});

//Show not notification on push event and monitor the browser's response
self.addEventListener('push', function(ev){
   console.log('Push event called!!')
})
