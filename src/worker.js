import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    
    // Handle favicon.ico requests - return 204 No Content instead of redirect
    if (url.pathname === '/favicon.ico') {
      return new Response(null, {
        status: 204,
        headers: {
          'Cache-Control': 'public, max-age=86400',
        }
      })
    }
    
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
      // First, try to get the exact asset
      const page = await getAssetFromKV(
        { request, waitUntil: ctx.waitUntil.bind(ctx) },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== 'undefined' ? __STATIC_CONTENT_MANIFEST : {},
        }
      )
      
      // Add CORS headers to response
      const response = new Response(page.body, page)
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
      
      return response
      
    } catch (e) {
      // If asset not found and it's not a file request, serve index.html for SPA routing
      if (!url.pathname.includes('.')) {
        try {
          const indexPage = await getAssetFromKV(
            {
              request: new Request(`${url.origin}/index.html`, {
                method: request.method,
                headers: request.headers,
              }),
              waitUntil: ctx.waitUntil.bind(ctx),
            },
            {
              ASSET_NAMESPACE: env.__STATIC_CONTENT,
              ASSET_MANIFEST: typeof __STATIC_CONTENT_MANIFEST !== 'undefined' ? __STATIC_CONTENT_MANIFEST : {},
            }
          )

          return new Response(indexPage.body, {
            status: 200,
            headers: {
              ...indexPage.headers,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            },
          })
        } catch (indexError) {
          console.error('Failed to serve index.html:', indexError)
        }
      }
      
      // Return 404 for actual missing files
      return new Response('Not Found', { 
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain',
        }
      })
    }
  },
}
