//const cacheName = 'js13kPWA-v1';

self.addEventListener('activate', (e) => {
     e.waitUntil(
         caches.keys().then(function(cacheNames) {
               return Promise.all(
                     cacheNames.map(function(cacheName) {
                            console.log(cacheName)                         
                            caches.open(cacheName).then(function(cache) {
                               return cache.match('/images/logo-32x32.png').then(function(response) {
                                 if (response) {
                                   console.log(' Found response in cache:', response);
                                 }
                               })
                             })
//                              const r = await caches.match('/images/logo-32x32.png');
//                              conosle.log(r)
                     })
                 )
         })
       )
//     const r = await caches.match(e.request);
   
//     if (r) { return r; }
 
});
