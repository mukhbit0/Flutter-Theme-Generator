import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler';

export default {
  async fetch(request, env, ctx) {
    try {
      return await getAssetFromKV(
        { request, waitUntil: ctx.waitUntil.bind(ctx) },
        {
          mapRequestToAsset: serveSinglePageApp,
          cacheControl: {
            bypassCache: env.ENVIRONMENT === 'development',
          },
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== 'undefined' ? __STATIC_CONTENT_MANIFEST : {},
        }
      );
    } catch (e) {
      return new Response(e.message || 'Internal Error', { status: 500 });
    }
  }
}
