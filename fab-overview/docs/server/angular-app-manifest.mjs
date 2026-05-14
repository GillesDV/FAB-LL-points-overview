
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/FAB-LL-points-overview/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/FAB-LL-points-overview"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1464, hash: '35af647b967ed477d2a2b75f4594fdc5265f04b2f9811fedef7905f1e7925061', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 972, hash: '386abb283e5d5d748392dc6900e994d55141e8ead7e71631a378154b2d33b6ac', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 6946, hash: '084c9b1b93e5ba4499cca9df0e539685b34ea977f97a8b04a8c7d3a8dc11aca6', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-WZWTZBGV.css': {size: 3594, hash: 'l05sdCZ6yAg', text: () => import('./assets-chunks/styles-WZWTZBGV_css.mjs').then(m => m.default)}
  },
};
