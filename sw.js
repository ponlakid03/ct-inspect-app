// CT Inspection App — Service Worker
// Caches all app files for full offline use

const CACHE = 'ct-inspect-v2';
const ASSETS = [
  './',
  './index.html',
  './CT_Site_Survey_App.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './favicon.png'
];

// Install: cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: remove old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => cached))
  );
});
