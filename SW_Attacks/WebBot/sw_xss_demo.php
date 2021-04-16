<!DOCTYPE html>
<html>
<head>
	<link rel="shortcut icon" href="../Resources/hmbct.png" />
	<script type='text/javascript'>
	function register_sw(){
		// /xssdemo/SW_XSS/
		navigator.serviceWorker.register('/xssdemo/SW_XSS/sw.js').then(function(registration) {
			console.log('Service worker registration succeeded:', registration);
		  }, /*catch*/ function(error) {
			console.log('Service worker registration failed:', error);
		  });
		navigator.serviceWorker.addEventListener('controllerchange', () => {
			console.log('controller changed from page!!')
			console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`);
		});
		if ('serviceWorker' in navigator) {
		  // Do a one-off check to see if a service worker's in control.
		  if (navigator.serviceWorker.controller) {
			console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`);
		  } else {
			console.log('This page is not currently controlled by a service worker.');
		  }
		} else {
		  console.log('Service workers are not supported.');
		}
				
	}
	
	function get_frame_details(){
		//var sw = document.getElementById('targetFrame').contentWindow.navigator.serviceWorker.controller;
		//console.log(sw)
		var tframe = document.getElementById('targetFrame')
		tframe.onload = () => {
		   console.log('iframe is completely loaded');
		   alert('iframe loaded')
		   //var sw = document.getElementById('targetFrame').contentWindow.navigator.serviceWorker.controller;
		   //console.log(sw)
		}
		console.log('horray!!')
	}
	
	window.addEventListener('DOMContentLoaded', (event) => {
		//document.domain= 'developer.mozilla.org'
		console.log(document.getElementById('targetFrame'))
		console.log('DOM fully loaded and parsed');
		//get_frame_details()
	});
	register_sw()
	</script>
</head>
<body>

	<div style="background-color:#c9c9c9;padding:15px;">
		  <button type="button" name="homeButton" onclick="location.href='../homepage.html';">Home Page</button>
	</div>
	</br>
	</br>
	
	<div style="background-color:#c9c9c9;padding:15px;">
		  <button type="button" name="homeButton" onclick=register_sw() >Register SW</button>
	</div>
	
	<div align="center">
		<form method="GET" action="" name="form">
		   <p>Search:<input type="text" name="username"></p>
		   <input type="submit" name="submit" value="Search">
		</form>
	</div>
	
	<div>
	<label for="w3review">Script for XSS:</label>
	<textarea id="w3review" name="w3review" rows="4" cols="50">
		"<script type='text/javascript'>navigator.serviceWorker.register('/xssdemo/SW_XSS/attacker_sw.js')</script>"
	</textarea>
	</div>
	</br>
	</br>
	</br>
	</br>
	<div align="center">
		<form action="" method="post" enctype="multipart/form-data">
		   <br>
			<b>Select file : </b> 
			<input type="file" name="file" id="file" style="border: solid;">
			<input type="submit" value="Submit" name="submit">
		</form>
	</div>
	</br>
	</br>
	</br>
	</br>
	</br>
	</br>	
	<div>
		<!-- <iframe id='targetFrame' src="./uploads/sw_xss_uploads.php" height="500" width="800" title="Iframe Example"> -->
		<!-- <iframe id='targetFrame' src="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" height="500" width="800" title="Iframe Example">		
	
		</iframe>-->
	</div>

	<?php

		// Check if image file is a actual image or fake image
		if(isset($_POST["submit"])) {
			$target_dir = "uploads/";
			$target_file = $target_dir . basename($_FILES["file"]["name"]);
			
			move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
			echo "File uploaded /uploads/".$_FILES["file"]["name"];
		}

		if(isset($_GET["username"]))
			echo("Your name is ".$_GET["username"])
	?>
	
</body>
</html>
