self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  return fetch(url)
});
