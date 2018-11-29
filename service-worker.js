var CACHE_NAME = 'my-site-cache-v1';
var filesToCache = [
    '/',
    '/index.html',
    '/formulario.html',
    '/listar_perro.html',
    '/fonts/untitled-font-1.eot',
    '/fonts/untitled-font-1.svg',
    '/fonts/untitled-font-1.ttf',
    '/fonts/untitled-font-1.woff',
    '/css/boostrap.min.css',
    '/css/font.css',
    '/css/formulariomain.css',
    '/css/inicio.css',
    '/css/listarperros.css',
    '/css/main.css',
    '/css/menu.css',
    '/js/jquery.min.js',
    '/js/boostrap.min.js',
    '/js/app.js',
    '/js/javaformulario.js',
    '/js/javamenu.js',
    '/img/banner-1-big.jpeg',
    '/img/banner-2-big.jpg',
    '/img/banner-3-big.JPG',
    '/img/fondo-paws.jpg',
    '/img/icon.png',
    '/img/perro-calle1.jpg',
    '/img/perro-calle2.jpg',
    '/img/perro-calle3.jpg',
    '/img/perro-calle4.jpg',
    '/img/perro-calle5.jpg',
    '/img/perro-calle6.jpg',
    '/img/perro-financiamiento.jpg',
    '/img/rescateee.jpg'
];
self.addEventListener( 'install', function( e ) {
  console.log( '[ServiceWorker] Install' );
  e.waitUntil(
      caches.open( CACHE_NAME ).then( function( cache ) {
          console.log( '[ServiceWorker] Caching app shell' );
          return cache.addAll( filesToCache );
      } )
  );
});

self.addEventListener( 'activate', function( e ) {
  console.log( '[ServiceWorker] Activate' );
  e.waitUntil(
    caches.keys( ).then( function( keyList ) {
      return Promise.all( keyList.map( function( key ) {
        if ( key !== CACHE_NAME ) {
          console.log('[ServiceWorker] Removing old cache', key );
          return caches.delete( key );
        }
      }));
    })
  );
  return self.clients.claim();
});



self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://misperris.pythonanywhere.com/apilistaperros/?format=json';
  if (e.request.url.indexOf(dataUrl) > -1) {
  
    e.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {

    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});