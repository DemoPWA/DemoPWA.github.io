const cacheName = 'js13kPWA-v1';

self.addEventListener('activate', (e) => {
     event.waitUntil(
         caches.keys().then(function(cacheNames) {
               return Promise.all(
                     cacheNames.map(function(cacheName) {
                            console.log(cacheName)
                     })
                 )
         })
       )
//     const r = await caches.match(e.request);
   
//     if (r) { return r; }
 
});
