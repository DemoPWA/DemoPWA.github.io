const queryString = self.location.search;
const urlParams = new URLSearchParams(queryString);
const sw_host = urlParams.get('host')

importScripts('./scripts/libs/idb-keyval.js');
importScripts(sw_host+'/scripts/analytics-sw.js');

self.addEventListener('install', function(event) {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  if(self.location.origin!=sw_host){
    console.log('XSS Success!!')
  }
  else
    console.log('Host SW activated!!')
})
   
