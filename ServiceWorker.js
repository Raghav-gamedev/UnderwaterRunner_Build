const cacheName = "Oceanic Games-UnderWaterRunner-1.0.0";
const contentToCache = [
    "Build/69d568789bedf355ce78a368a2efab52.loader.js",
    "Build/1efc776ee2579476326dfec3ec401122.framework.js.br",
    "Build/4bef417c332001c3403b1409117dcc86.data.br",
    "Build/734accc42510efc343c162d849b05b94.wasm.br",
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
