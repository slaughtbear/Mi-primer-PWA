const CACHE_NAME = "v1_cache_mi_pdwa";

const urlsToCache = [
  "./src/",
  "./src/index.php",
  "./src/manifest.json",
  "./src/assets/scripts/main.js",
  "./src/assets/icons/icono.png",
  "./src/assets/icons/icono-192.png",
  "./src/assets/icons/icono-512.png",
  "./src/assets/images/banner_gpa.jpg",
  "./src/assets/images/perfil.jpg",
  "./src/templates/banner.html",
  "./src/templates/cta.html",
  "./src/templates/experiencia.html",
  "./src/templates/footer.html",
  "./src/templates/formulario.html",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => {
          self.skipWaiting();
        });
      })
      .catch((err) => console.log(`No se ha registrado el cache ${err}`)),
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          }),
        );
      })

      .then(() => {
        self.clients.claim();
      }),
  );
});


self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(e.request);
    })
  );
});
