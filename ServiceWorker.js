const cacheName = "Oceanic Games-UnderWaterRunner-1.0.0";
const contentToCache = [
    "Build/65e0ef843088c3545797f5c687df25e3.loader.js",
    "Build/ded774c46c2268b813b0e32cc5d463b8.framework.js",
    "Build/a7ed1ae6841affddeb23d27d2479e34f.worker.js",
    "Build/e232faf3e481677377617ba711a71b0b.data",
    "Build/1bfe8db4999f7d2295b4a40f7316ffad.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
