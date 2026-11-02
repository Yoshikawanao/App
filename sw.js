// Service worker do app de aportes.
// Estratégia: rede primeiro (você sempre recebe a versão mais nova do site) e cache como reserva.
// Só arquivos do próprio site passam por aqui; Firebase, fontes e Chart.js vão direto para a rede.
const C = 'aportes-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(
    fetch(r)
      .then(res => {
        if (res.ok) { const cp = res.clone(); caches.open(C).then(c => c.put(r, cp)); }
        return res;
      })
      .catch(() => caches.match(r).then(m => m || caches.match('./index.html')))
  );
});
