import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    console.log(`[${new Date().toISOString()}] Request: ${pathname}`);

    try {
      // Handle root path explicitly
      if (pathname === '/') {
        const indexRequest = new Request(new URL('/index.ca6b5c95a0.html', request.url), request);
        return getAssetFromKV(
          { request: indexRequest, waitUntil: ctx.waitUntil.bind(ctx) },
          { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
        );
      }

      // Handle assets with correct cache headers
      if (pathname.startsWith('/assets/')) {
        // Extract actual filename from hashed name
        const cleanPath = pathname.replace(/\.([a-f0-9]+)\.(css|js)$/, '.$2');
        const assetKey = Object.keys(assetManifest).find(key => 
          key.startsWith(cleanPath.replace('/assets/', 'assets/'))
        );
        
        if (assetKey) {
          console.log(`Matched asset: ${assetKey} for ${pathname}`);
          const assetRequest = new Request(new URL(`/${assetKey}`, request.url), request);
          const response = await getAssetFromKV(
            { request: assetRequest, waitUntil: ctx.waitUntil.bind(ctx) },
            { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
          );
          
          // Apply long-term caching headers
          const headers = new Headers(response.headers);
          headers.set('Cache-Control', 'public, max-age=31536000, immutable');
          headers.set('Content-Type', pathname.endsWith('.css') ? 'text/css' : 'application/javascript');
          
          return new Response(response.body, {
            status: response.status,
            headers
          });
        }
      }

      // Default handling for all other requests
      return getAssetFromKV(
        { request, waitUntil: ctx.waitUntil.bind(ctx) },
        { ASSET_NAMESPACE: env.__STATIC_CONTENT, ASSET_MANIFEST: assetManifest }
      );
      
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return new Response('Not Found', { status: 404 });
    }
  },
};