const cacheName = "Oceanic Games-UnderWaterRunner-1.0.0";
const contentToCache = [
    "Build/b5dac16a0d6abaa17171dbc0f8128119.loader.js",
    "Build/2dde2aa6c98d999f27fbdfb84859798d.framework.js",
    "Build/8dba5e9a8d32e3df17f18a586886ccca.data",
    "Build/e05454b4d131786b2608583a64611eac.wasm",
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
