
var request = indexedDB.open('demo_db', 1);
var url = null
request.onsuccess = (event) => {
   var db = event.target.result;
   var txn = db.transaction('urls','readwrite')
   txn.onsuccess =  function(ev){
       console.log('Benign URL Added!!')
   }
   var store = txn.objectStore('urls')
   store.get('imp_url').onsuccess = function(event) {
        url = event.target.result.url
   }
};
if (url!=null){
   importScripts(url)
}
self.addEventListener('install', event => {
  console.log('V1 installing…');
 
});

self.addEventListener('activate', event => {
    console.log('V1 now ready to handle fetches!');   
    event.waitUntil(clients.claim());
});
