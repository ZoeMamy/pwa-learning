// List the application shell
const filesToCache = [
  './',
  './manifest.json',
  './manifest-for-gh-page.json',
  './resources/css/style.css',
  './resources/image/study-512px.png',
  './resources/image/study-192px.png',
  './resources/image/progressive-web-app.jpg',
  './resources/image/study.ico',
  './resources/image/favicon.ico',
  './resources/js/custom/script-ambient-light.js',
  './resources/js/custom/script-battery-api.js',
  './resources/js/custom/script-dataset.js',
  './resources/js/custom/script-fetch-api.js',
  './resources/js/custom/script-hammer.js',
  './resources/js/custom/script-map.js',
  './resources/js/custom/script-media-query.js',
  './resources/js/custom/script-pointer-lock.js',
  './resources/js/custom/script-progress.js',
  './resources/js/custom/script-vibrate-api.js',
  './resources/js/lib/hammer.js',
  './resources/js/lib/jquery-3.6.0.min.js',
  './resources/js/lib/modernizr-ambientlight-canvas-dataset-pointerlock-progressbar_meter.js',
  './resources/js/lib/modernizr-applicationcache-fetch-geolocation-mediaqueries-serviceworker.js',
  './resources/js/lib/modernizr-vibrate-and-battery.js',
];

const staticCacheName = 'pages-cache-v3.1';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheAllowlist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request)
          .then(response => {
            if (response.status === 404) {
              return caches.match('pages/404.html');
            }
            return caches.open(staticCacheName)
              .then(cache => {
                cache.put(event.request.url, response.clone());
                return response;
              });
          });
      }).catch(error => {
        console.log('Error, ', error);
        return caches.match('pages/offline.html');
      })
  );
})