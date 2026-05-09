/* global hexo */

'use strict';

const { URL } = require('url');

function ensureAbsoluteUrl(base, input) {
  try {
    return new URL(input, base).toString();
  } catch (err) {
    return input;
  }
}

function normalizeRoot(root) {
  if (!root) return '/';
  return root.endsWith('/') ? root : `${root}/`;
}

hexo.extend.generator.register('_pwa_manifest', function() {
  const theme = this.theme.config;
  if (!theme.pwa || theme.pwa.enable !== true) {
    return;
  }

  const root = normalizeRoot(this.config.root);
  const manifestConfig = theme.pwa.manifest || {};
  const siteUrl = this.config.url || root;
  const name = manifestConfig.name || this.config.title;
  const shortName = manifestConfig.short_name || name;
  const description = manifestConfig.description || this.config.description || '';
  const themeColor = manifestConfig.theme_color || theme.color.navbar_bg_color;
  const backgroundColor = manifestConfig.background_color || theme.color.body_bg_color || '#ffffff';
  const scope = manifestConfig.scope || root;
  const startUrl = manifestConfig.start_url || root;
  const iconConfig = Array.isArray(manifestConfig.icons) ? manifestConfig.icons : [];
  const fallbackIcon = theme.apple_touch_icon || theme.favicon;

  const icons = iconConfig
    .filter(item => item && (item.src || fallbackIcon))
    .map(item => ({
      src: ensureAbsoluteUrl(siteUrl, item.src || fallbackIcon),
      sizes: item.sizes || '192x192',
      type: item.type || 'image/png'
    }));

  if (!icons.length && fallbackIcon) {
    icons.push({
      src: ensureAbsoluteUrl(siteUrl, fallbackIcon),
      sizes: '192x192',
      type: 'image/png'
    });
  }

  const manifest = {
    name,
    short_name: shortName,
    description,
    theme_color: themeColor,
    background_color: backgroundColor,
    display: manifestConfig.display || 'standalone',
    scope,
    start_url: startUrl,
    icons
  };

  return {
    path: (manifestConfig.path || '/manifest.json').replace(/^\/+/, ''),
    data: JSON.stringify(manifest, null, 2)
  };
});

hexo.extend.generator.register('_pwa_service_worker', function() {
  const theme = this.theme.config;
  if (!theme.pwa || theme.pwa.enable !== true) {
    return;
  }

  const root = normalizeRoot(this.config.root);
  const swConfig = theme.pwa.service_worker || {};
  const strategy = swConfig.strategy === 'cache-first' ? 'cache-first' : 'network-first';
  const cacheName = swConfig.cache_name || 'fluid-pwa-v1';
  const preloadUrls = Array.isArray(swConfig.preload_urls) && swConfig.preload_urls.length
    ? swConfig.preload_urls
    : ['/'];
  const normalizedPreload = [...new Set(preloadUrls.map(item => ensureAbsoluteUrl(this.config.url, item)))];

  const swContent = `
const CACHE_NAME = ${JSON.stringify(cacheName)};
const ROOT = ${JSON.stringify(root)};
const STRATEGY = ${JSON.stringify(strategy)};
const PRECACHE_URLS = ${JSON.stringify(normalizedPreload)};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (request.mode === 'navigate') {
      return caches.match(PRECACHE_URLS[0]);
    }
    throw error;
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(ROOT)) return;

  event.respondWith(STRATEGY === 'cache-first' ? cacheFirst(request) : networkFirst(request));
});
`.trimStart();

  return {
    path: (swConfig.path || '/sw.js').replace(/^\/+/, ''),
    data: swContent
  };
});
