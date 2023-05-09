// You can change the number on the end of the site to refresh the cache
const CACHE_NAME = 'my-site-v1';

// add all your files in the CACHE_URLS
const CACHE_URLS = ['/',
  'index.html',
  '404.html',
  '/source/html/demos.html',
  '/source/html/About-me.html',
  '/source/html/qualifications.html',
  '/source/html/cssdemo.html',
  '/source/html/contactus.html',
  '/source/html/JS.html',
  '/source/css/style.css',
  '/source/css/cssdemo.css',
  '/source/resources/email.svg',
  '/source/resources/github.svg',
  '/source/resources/hero.webp',
  '/source/resources/laptop.webp',
  '/source/resources/Logo.png',
  '/source/resources/star.webp',
  '/source/resources/hero2.webp',
  '/source/resources/animation.webp',
  '/source/resources/css.webp',
  '/source/resources/cssimage.webp',
  '/source/fonts/JosefinSans-VariableFont_wght.ttf'
  // add all your images in here, in the correct folders. No need to add this file
];
//DO NOT change any of the code below

self.addEventListener("install", function (event) {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log("Cache opened");
        return cache.addAll(CACHE_URLS);
      })
  );
});


self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName.startsWith('my-site-') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log(`Return ${event.request.url} from cache`);
        return response;
      }
      console.log(`Fetch ${event.request.url} from network`);
      return fetch(event.request);
    })
  );
});
