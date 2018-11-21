(function() {

  if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service-worker.js')
               .then(function() { 
                   console.log('Service Worker Registered'); 
              });
  }
})( );

(function() {
console.log('dentro de la funcion');
fetch('http://misperris.pythonanywhere.com/apilistaperros/?format=json')
.then(data => data.json())
.then(data => {
  console.log(data)
})


})( );