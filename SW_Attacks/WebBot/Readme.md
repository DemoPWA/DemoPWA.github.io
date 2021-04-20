<h2>WebBot</h2>

This attack uses self-update bug to extend SW's lifetime in the background without alerting the user or website about its activity. In order for this attack to work, 

<ul>
  <li>The SW registered should have self-update functionality</li>
  <li>The SW script in server should constantly change every few seconds to create a fresh version</li>
</ul>

Since the server needs to serve dynamic resource (SW file), this demo requires a web server (Apache HTTP, Nginx etc.). 

Further, in order to update the SW script constantly, execute the shell code in update_sw.txt. This simply appends current time to the SW file every 10 secods and therefore, everttime an update() method is invoked by the SW, a fresher version of the file is found in the server.
