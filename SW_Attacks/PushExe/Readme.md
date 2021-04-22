<h2>PushExe</h2>

This attack achieves Continuous Execution by activating the SW via multiple pushs events. 
However, the SW fails to display a notification whenever a push message is recieved and keeps the SW running stealthily in the background.

In order for the attack to work, the user has to visit the malicious page (index.html) that registers SW and grant notification permission to its origin. In Firefox browser, the browser itself doesn't 
display a default notification when the SW fails to show notification on a push event.

Although, the browser revokes push subscription to an origin if it doesn't display a notification for 15 times, it can be easily renewed before it is revoked. The SW used for this attack renews the subscription after receiving 10 push events. 

Note: This attack works in latest version of Firefox browser (v 87.0).
