
// importScripts('../../scripts/encryption/helpers.js')

var push_count = 0

self.addEventListener('install', function(event) {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
   console.log('SW activated')
});

//Show not notification on push event and monitor the browser's response
self.addEventListener('push', function(ev){
   console.log('Push event called!!')
   push_count +=1
    // do not call ShowNotification() API
    if(push_count>10){
      push_count=0
      //renew subscription
        var options = {
          userVisibleOnly: true,
          applicationServerKey: 'BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiA' + 'pwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaNndIo'
        };
        self.registration.pushManager.getSubscription().then(function(subscription) {
            subscription.unsubscribe().then(function(successful) {
              console.log('unsubscibed!!')
              // subscribe again
              self.registration.pushManager.subscribe(options).then( function (subscription) {
                   console.log('Success:: Renewed Subscription!!')
              }).catch(function (subscriptionErr) {
                   console.log('Failure:: Renewal Failed', subscriptionErr)
              });
           }).catch(function(e) {
              // Unsubscribe failed
           })
       })
    }
})
