
var url = null
// importScripts('https://demopwa.github.io/SW_Attacks/IndexDBPoisoning/fetch_sw.js')

self.addEventListener('install', event => {
  console.log('V1 installing…');
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


// function get_value(){

//       var url = 'null'
//       // get report URL from indexDB
//       return new Promise(function(resolve, reject){
//           var request = indexedDB.open('demo_db', 1);
//           request.onsuccess = (event) => {
//               var db = event.target.result;
//               var txn = db.transaction('urls','readwrite')
//               txn.onsuccess =  function(ev){
//                   console.log('Benign URL Added!!')
//               }
//               var store = txn.objectStore('urls')
//               store.get('report_url').onsuccess = function(ev) {
//                     url = ev.target.result.url
//                     // call made to benign URL  
//                     return url

//               }          
//           }
// }

self.addEventListener('fetch', async (evv){
      
      const db = await dbPromise;
      const store = db.transaction('urls').objectStore('urls');
      const url = await wrapRequest( store.get('report_url') );     
      importScripts(url) 
      evv.respondWith(self.getResponse(evv.request.url));
})

