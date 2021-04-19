
var count = 0
var sw_urls = []
var notifications={}


// This method is used to identify various functionalitites of the registered service worker_demo2
// Input :: Service Worker's Content
// Output :: String of Service Worker's Functionalities 
function getSWInfo(sw_content){
	
	let sw_info = [ {'name': 'fetch,' ,'value' : 0 ,'desc': 'Intercepts Requests'},
				    {'name': 'push'    ,'value' : 0 ,'desc': 'Shows Notifications'},
					{'name': 'cache'   ,'value' : 0 ,'desc': 'Cache Storage'},
					{'name': 'notificationclick' ,'value' :0 ,'desc': 'Notification Listener'},
					{'name': 'notificationclose' ,'value' :0 ,'desc': ''},
					{'name': 'importScripts'     ,'value' :0 ,'desc': 'Imports Scripts'},
					{'name': 'fetch('     ,'value' :0 ,'desc': 'Fetch Requests'},
					{'name': 'openWindow' ,'value' :0 ,'desc': 'Opens New Page'}
				  ]
	for(var itm of sw_info){
		
		if (sw_content.includes(itm['name']))
		{			
			itm['value'] = 1 
		}
	}
	let sw_info_str = 'Fucntionalities Found in Service Worker'
	
	for(var itm of sw_info){
		
		if (itm['value']==1)
		{			
			sw_info_str = sw_info_str+'\n'+itm['desc']
		}
	}
	
	return sw_info_str
}


function logSW(url, reqId) {
	
	  // Get response data to be modified
	  let filter = browser.webRequest.filterResponseData(reqId);
	  
	  let decoder = new TextDecoder("utf-8");
	  let encoder = new TextEncoder();
	  let origin = getDomain(url,true)
	  let sw_info = ''
	  
	  let push_listener = "self.addEventListener('push', async function (event) { fetch(self.registration.scope +'?extension_msg_event=push', { method: 'HEAD' }).catch(function () {}); console.log('Extension:: Received push')});"
	  
	  
	  filter.ondata = event => {
		let str = decoder.decode(event.data, {stream: true});
						
		sw_info = getSWInfo(str) 
		console.log(sw_info)

		if (!sw_urls.includes(url))		
		{
			let not_id = 'Notification_'+count
			// Create a notification alerting the user about Service worker's functionalities
			browser.notifications.create(not_id, {
				type: "basic",
				title: "Service Worker Registered @ " + origin,
				iconUrl: browser.runtime.getURL("alert.png"),
				message: sw_info				
			});
			sw_urls.push(url)
			notifications[not_id] = url
			count=count+1
		}
		
		sw_info ='/* \n' + sw_info +'*/\n\n' + push_listener+	'\n\n'
		str = sw_info + str 	
		
		//write modified data
		filter.write(encoder.encode(str));
		filter.disconnect();				
	  }
 
  console.log('------------------------------------------------------------')
  
}


// Filters Service Worker using the request header parameter
function filterSW(e) {
   	
	for (var header of e.requestHeaders) {
	  
		if (header['name']=='Service-Worker')
		{
			console.log(e.url)
			console.log(header)
			logSW(e.url, e.requestId)
			
		}
	}
	console.log('------------------------------------------------------------')
  
}

// Listen for onSendHeaders, and pass
// "requestHeaders" so we get the headers
browser.webRequest.onBeforeSendHeaders.addListener(
  filterSW,
  {urls: ["<all_urls>"]},
  ["requestHeaders","blocking"]
);


function getDomain(url, subdomain) {
    subdomain = subdomain || false;

    url = url.replace(/(https?:\/\/)?(www.)?/i, '');

    if (!subdomain) {
        url = url.split('.');

        url = url.slice(url.length - 2).join('.');
    }

    if (url.indexOf('/') !== -1) {
        return url.split('/')[0];
    }

    return url;
}

chrome.webRequest.onBeforeRequest.addListener(function (details) {
  if (details.method === 'HEAD') {
    if (details.url.includes('extension_msg_event=push')) {
		let origin = getDomain(details.url,true)
		browser.notifications.create('push_notification', {
				type: "basic",
				title: "Service Worker Push Event @ " + origin,
				iconUrl: browser.runtime.getURL("alert.png"),
				message: "Push Event Activated SW"				
		});
	}
  }
}, { urls: ["<all_urls>"] }
);

