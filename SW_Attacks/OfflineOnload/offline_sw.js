
const cacheName = 'js13kPWA-v1';

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    if (e.request.url.indexOf('snippets.js')<0){
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
    }
    return response;
  })());
});

self.addEventListener('install', event=>{
    self.skipWaiting();
})


self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
