
var url = null
// importScripts('https://demopwa.github.io/SW_Attacks/IndexDBPoisoning/fetch_sw.js')

self.addEventListener('install', event => {
  console.log('V1 installing…');
});

self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');   
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', evv =>{
      var url = 'null'
      // get report URL from indexDB
      var request = indexedDB.open('demo_db', 1);
      request.onsuccess = (event) => {
          var db = event.target.result;
          var txn = db.transaction('urls','readwrite')
          txn.onsuccess =  function(ev){
              console.log('Benign URL Added!!')
          }
          var store = txn.objectStore('urls')
          store.get('report_url').onsuccess = function(event) {
                url = event.target.result.url
                // call made to benign URL   
                importScripts(url) 
                evv.respondWith(self.getResponse(evv.request.url));
          }          
      }
      
})

