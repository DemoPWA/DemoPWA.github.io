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

// Really basic idbRequest to Promise wrapper example
function wrapRequest(request){
  return new Promise(function(resolve,reject){
    request.onsuccess = r => resolve(request.result);
    request.onerror = reject;
  });
}

// Reusable database handle
const dbPromise = (function(){
    const openRequest = indexedDB.open('demo_db', 1);    
    return wrapRequest(openRequest);
  })();


async function get_url_value(){
      const db = await dbPromise;
      const store = db.transaction('urls').objectStore('urls');
      const res = await wrapRequest( store.get('report_url') );   
      url = res.url
      return Promise.resolve
}

self.addEventListener('fetch', evv => {
      
      evv.respondWith(self.getResponse(evv.request.url));
})
