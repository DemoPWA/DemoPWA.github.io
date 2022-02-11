
var url = null

var request = indexedDB.open('demo_db', 1);
 request.onsuccess = (event) => {
    var db = event.target.result;
    var txn = db.transaction('urls','readwrite')
    txn.onsuccess =  function(ev){
        console.log('Benign URL Added!!')
    }
    var store = txn.objectStore('urls')
    store.get('report_url').onsuccess = (evv) => {
         url = evv.target.result.url
         importScripts(url)
    }
 };

self.addEventListener('install', event => {
  console.log('V1 installing…');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');   
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', evv => {
      
      evv.respondWith(self.getResponse(evv.request.url));
})

