import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

// ES Module format with default export
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }
    
    try {
      // Try to serve static assets from KV
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: __STATIC_CONTENT_MANIFEST,
          mapRequestToAsset: req => {
            const url = new URL(req.url)
            
            // Handle SPA routing - serve index.html for all routes
            if (!url.pathname.includes('.') && url.pathname !== '/') {
              return new Request(`${url.origin}/index.html`, req)
            }
            
            return req
          }
        }
      )
    } catch (e) {
      // If asset not found, serve index.html for SPA routing
      try {
        let notFoundResponse = await getAssetFromKV(
          {
            request: new Request(`${url.origin}/index.html`, request),
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: __STATIC_CONTENT_MANIFEST,
          }
        )

        return new Response(notFoundResponse.body, {
          ...notFoundResponse,
          status: 200,
          headers: {
            ...notFoundResponse.headers,
            'Access-Control-Allow-Origin': '*',
          },
        })
      } catch (e) {
        return new Response('Not Found', { 
          status: 404,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        })
      }
    }
  },
}
