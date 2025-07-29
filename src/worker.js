import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    console.log(`[${new Date().toISOString()}] Request: ${pathname}`);

    try {
      // Configure options for getAssetFromKV
      const options = {
        ASSET_NAMESPACE: env.STATIC_ASSETS,
        ASSET_MANIFEST: assetManifest,
        mapRequestToAsset: (req) => {
          const url = new URL(req.url);
          // For root path, serve index.html
          if (url.pathname === '/') {
            return new Request(`${url.origin}/index.html`, req);
          }
          // For all other paths, use as-is
          return req;
        },
        // Add caching options
        cacheControl: {
          browserTTL: pathname.startsWith('/assets/') ? 31536000 : 3600, // 1 year for assets, 1 hour for others
          edgeTTL: pathname.startsWith('/assets/') ? 31536000 : 3600,
          bypassCache: false,
        }
      };

      // Get asset from KV
      const response = await getAssetFromKV(
        { request, waitUntil: ctx.waitUntil.bind(ctx) },
        options
      );

      // Add appropriate headers for assets
      if (pathname.startsWith('/assets/')) {
        const headers = new Headers(response.headers);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        
        // Set correct content type based on file extension
        if (pathname.endsWith('.css')) {
          headers.set('Content-Type', 'text/css; charset=utf-8');
        } else if (pathname.endsWith('.js')) {
          headers.set('Content-Type', 'application/javascript; charset=utf-8');
        }
        
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers
        });
      }

      return response;
      
    } catch (error) {
      console.error(`Error serving ${pathname}: ${error.message}`);
      
      // For SPA routing - serve index.html for non-asset requests
      if (!pathname.startsWith('/assets/') && !pathname.includes('.')) {
        try {
          const indexRequest = new Request(`${url.origin}/index.html`, request);
          return getAssetFromKV(
            { request: indexRequest, waitUntil: ctx.waitUntil.bind(ctx) },
            { ASSET_NAMESPACE: env.STATIC_ASSETS, ASSET_MANIFEST: assetManifest }
          );
        } catch (indexError) {
          console.error(`Error serving index.html: ${indexError.message}`);
        }
      }
      
      return new Response('Not Found', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
};