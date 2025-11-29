const cacheName = "Oceanic Games-UnderWaterRunner-1.0.0";
const contentToCache = [
    "Build/6fee88a6a9f9bbb01aeca731f5a6cce4.loader.js",
    "Build/b89ab5a7cb1275b89d1b5f47dbe197e3.framework.js",
    "Build/d32d712fe8f9673a8425f7957b63d11d.data",
    "Build/28cb16a6df1c59bc7dcec0b0208e0136.wasm",
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
