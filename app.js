window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceworker.js')
    .then(registration => {
      console.log('Sercice worker successfully registtered', registration);
    })
    .catch(error => {
      console.log('Sercice worker successfully failed', error);
    })
  }
})