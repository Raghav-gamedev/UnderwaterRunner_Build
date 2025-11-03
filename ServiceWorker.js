const cacheName = "Oceanic Games-UnderWaterRunner-1.0.0";
const contentToCache = [
    "Build/dda4ef5b690ba1f15dd724cca4dccaae.loader.js",
    "Build/1efc776ee2579476326dfec3ec401122.framework.js",
    "Build/4e0e187b10871eac44e9a787fd7a9bae.data",
    "Build/0ab03415fd959b1476650f08f68b9a26.wasm",
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
