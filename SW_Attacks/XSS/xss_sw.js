const queryString = self.location.search;
const urlParams = new URLSearchParams(queryString);
var sw_host = urlParams.get('host')
console.log(sw_host)

importScripts(sw_host+'/sdks/OneSignalSDKWorker.js');


self.addEventListener('install', function(event) {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  console.log(self.location.origin)
  if(self.location.origin!=sw_host){
    console.log('XSS Success!!')
  }
  else
    console.log('Host SW activated!!')
})
   
