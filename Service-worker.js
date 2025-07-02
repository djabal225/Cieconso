// service-worker.js
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installation en cours');
  
  // Force l'activation immédiate du nouveau service worker
  event.waitUntil(
    self.skipWaiting().then(() => {
      console.log('[Service Worker] skipWaiting effectué');
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activation en cours');
  
  // Prend immédiatement le contrôle de tous les clients
  event.waitUntil(
    self.clients.claim().then(() => {
      console.log('[Service Worker] Contrôle des clients pris');
    })
  );
});

self.addEventListener('fetch', function(event) {
  // Stratégie "Network Only" - toujours aller chercher sur le réseau
  console.log(`[Service Worker] Interception de la requête: ${event.request.url}`);
  event.respondWith(fetch(event.request));
});

self.addEventListener('message', (event) => {
  // Gestion des messages (pour une éventuelle extension future)
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});