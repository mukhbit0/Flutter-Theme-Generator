import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    console.log(`[${new Date().toISOString()}] Request: ${url.pathname}`);

    try {
      // Attempt to serve asset from KV
      const response = await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
          cacheControl: {
            browserTTL: 31536000,  // 1 year
            edgeTTL: 31536000,      // 1 year
            bypassCache: false
          }
        }
      );

      // Add cache headers for hashed assets
      if (url.pathname.includes('/assets/') && url.pathname.match(/[a-f0-9]{8}\./)) {
        const headers = new Headers(response.headers);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        headers.set('X-Asset-Source', 'KV');
        
        return new Response(response.body, {
          status: response.status,
          headers
        });
      }

      return response;
      
    } catch (error) {
      console.error(`[ERROR] ${error.message} for ${url.pathname}`);
      
      // Special handling for assets
      if (url.pathname.startsWith('/assets/')) {
        // Try direct fallback method for assets
        const assetKey = url.pathname.replace(/^\//, '');
        const asset = await env.__STATIC_CONTENT.get(assetKey, { type: 'arrayBuffer' });
        
        if (asset) {
          console.log(`Served ${assetKey} directly from KV`);
          
          // Determine MIME type based on file extension
          let contentType = 'application/octet-stream';
          if (url.pathname.endsWith('.css')) contentType = 'text/css';
          if (url.pathname.endsWith('.js')) contentType = 'application/javascript';
          
          return new Response(asset, {
            status: 200,
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=31536000, immutable',
              'X-Asset-Source': 'Direct-Fallback'
            }
          });
        }
        
        return new Response('Asset Not Found', { 
          status: 404,
          headers: { 'Content-Type': 'text/plain' } 
        });
      }

      // Handle SPA fallback
      try {
        console.log(`Attempting SPA fallback for ${url.pathname}`);
        const notFoundRequest = new Request(new URL('/index.html', request.url), request);
        const response = await getAssetFromKV(
          {
            request: notFoundRequest,
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: assetManifest,
          }
        );
        return response;
      } catch (spaError) {
        return new Response('Page Not Found', { status: 404 });
      }
    }
  },
};