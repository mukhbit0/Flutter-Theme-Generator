import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    try {
      // First, try to get the asset from KV.
      // This will work for your JS, CSS, images, and other assets.
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
        }
      );
    } catch (e) {
      // If the asset is not found (e.g., a route like /about),
      // and it's a navigation request (not for an asset in /assets),
      // serve the index.html as a fallback.
      const pathname = new URL(request.url).pathname;
      if (!pathname.startsWith('/assets')) {
        try {
          const notFoundRequest = new Request(new URL('/index.html', request.url), request);
          return await getAssetFromKV(
            {
              request: notFoundRequest,
              waitUntil: ctx.waitUntil.bind(ctx),
            },
            {
              ASSET_NAMESPACE: env.__STATIC_CONTENT,
              ASSET_MANIFEST: assetManifest,
            }
          );
        } catch (e) {
          return new Response('Not Found', { status: 404 });
        }
      }

      // For other not-found assets, return a 404.
      return new Response('Not Found', { status: 404 });
    }
  },
};