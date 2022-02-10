self.getResponse = async function(url){  
  if (url == 'https://avatars0.githubusercontent.com/u/70142'){
    url = 'https://avatars0.githubusercontent.com/u/70143'
    response = await fetch(url)
    return response
  }
  response = new Response('SW Hijacked!!!');
  return response
}
