const CACHE_NAME = "v1_cache_mi_pdwa";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/scripts/main.js",
  "./assets/icons/icono.png",
  "./assets/icons/icono-192.png",
  "./assets/icons/icono-512.png",
  "./assets/images/banner_gpa.jpg",
  "./assets/images/perfil.jpg",
  "./templates/banner.html",
  "./templates/cta.html",
  "./templates/experiencia.html",
  "./templates/footer.html",
  "./templates/formulario.html",
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
