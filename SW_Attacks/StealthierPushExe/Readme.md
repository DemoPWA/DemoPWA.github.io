<h2>StealthierPushExe</h2>

This attack achieves Continuous Execution by activating the SW via multiple pushs events. 
However, once the SW recieves a push event, it displays a notification by invoking showNotification API and immidiately closes the notification by using Notification.close() API. As a result, the user isn't alerted of the SW being activated int he background.

In order for the attack to work, the user has to visit the malicious page (index.html) that registers SW and grant notification permission to its origin. 


Note: This attack works in latest version of Firefox browser (v 87.0) and Opera (v71.0). Further, in case of Chrome and Edge, it works in versions up until the lastest verion (v89.0)
