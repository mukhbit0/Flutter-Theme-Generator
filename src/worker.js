import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    return await getAssetFromKV(event, {
      // Always serve index.html for all page requests
      mapRequestToAsset: serveSinglePageApp,
      // Cache settings
      cacheControl: {
        bypassCache: process.env.ENVIRONMENT === 'development',
      },
    });
  } catch (e) {
    return new Response(e.message || 'Internal Error', { status: 500 });
  }
}
