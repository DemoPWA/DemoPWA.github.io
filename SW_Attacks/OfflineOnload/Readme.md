<h2>OfflineOnload</h2>

This demo is reproduced based on the attack description from <a href='https://dl.acm.org/doi/10.1145/3243734.3243867'>paper</a> by Lee et al.

Using this demo, an attacker can obtain browsing history of an user. In case the user had already visited sites that registered SW with offline support, then when the browser is offline, 
if the targeted webpages were requested, the respective SW would load the content. 

In this paper, authors found that if these web pages were loaded in an embedded iframe, 
then few browsers would send an onload event to the parent page only when the web page visited in iframe was loaded in offline mode via a SW.

Note: This attack works for latest version of Firefox (v87.0) and Safari(v14.0)
