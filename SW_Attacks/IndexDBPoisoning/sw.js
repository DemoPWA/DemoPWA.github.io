
var url = null
// importScripts('https://demopwa.github.io/SW_Attacks/IndexDBPoisoning/fetch_sw.js')
 var request = indexedDB.open('demo_db', 1);
   request.onsuccess = (event) => {
      var db = event.target.result;
      var txn = db.transaction('urls','readwrite')
      txn.onsuccess =  function(ev){
          console.log('Benign URL Added!!')
      }
      var store = txn.objectStore('urls')
      store.get('imp_url').onsuccess = async function(event) {
           url = event.target.result.url
      }
   };

function createDB(){   
   var request = indexedDB.open('demo_db', 1);
   request.onsuccess = (event) => {
      var db = event.target.result;
      var txn = db.transaction('urls','readwrite')
      txn.onsuccess =  function(ev){
          console.log('Benign URL Added!!')
      }
      var store = txn.objectStore('urls')
      store.get('imp_url').onsuccess = async function(event) {
           url = event.target.result.url
      }
   };
   
}

self.addEventListener('install', event => {
  console.log('V1 installing…');
  event.waitUntil(createDB())
  importScripts(url)
 
});

self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');   
//     createDB()
//     importScripts('https://demopwa.github.io/SW_Attacks/IndexDBPoisoning/fetch_sw.js')
    event.waitUntil(clients.claim());
});

if (url!=null){
   importScripts(url)
}
