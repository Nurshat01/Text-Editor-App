
const CACHE_NAME = 'page-cache';
const URLS_TO_CACHE = ['/index.html', '/'];
const CACHE_NAME_ASSET = 'asset-cache';

const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: CACHE_NAME,
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: URLS_TO_CACHE,
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: CACHE_NAME_ASSET,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
