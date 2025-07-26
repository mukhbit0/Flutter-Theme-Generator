import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

/**
 * Cloudflare Worker for serving Flutter Theme Generator
 */
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  try {
    // Serve static assets
    return await getAssetFromKV(event, {
      mapRequestToAsset: req => {
        const url = new URL(req.url)
        
        // Handle SPA routing - serve index.html for all routes
        if (!url.pathname.includes('.') && url.pathname !== '/') {
          return new Request(`${url.origin}/index.html`, req)
        }
        
        return req
      }
    })
  } catch (e) {
    // Handle errors
    let pathname = url.pathname
    
    // Fallback to index.html for SPA routing
    if (!pathname.includes('.')) {
      try {
        return await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${url.origin}/index.html`, req)
        })
      } catch (e) {
        // If index.html also fails, return 404
        return new Response('Not found', { status: 404 })
      }
    }
    
    return new Response('Not found', { status: 404 })
  }
}

// Handle OPTIONS requests for CORS
addEventListener('fetch', event => {
  if (event.request.method === 'OPTIONS') {
    event.respondWith(handleOptions(event.request))
  }
})

function handleOptions(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
