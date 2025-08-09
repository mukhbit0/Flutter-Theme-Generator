import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    console.log(`[${new Date().toISOString()}] Request: ${pathname}`);

    // Handle API routes
    if (pathname.startsWith('/api/')) {
      return this.handleApiRequest(request, env, pathname);
    }

    try {
      // Configure options for getAssetFromKV
      const options = {
        ASSET_NAMESPACE: env.STATIC_ASSETS,
        ASSET_MANIFEST: assetManifest,
        mapRequestToAsset: (req) => {
          const url = new URL(req.url);
          const path = url.pathname;
          
          // For root path, serve index.html
          if (path === '/') {
            return new Request(`${url.origin}/index.html`, req);
          }
          
          // For SPA routes (non-asset paths without extensions), serve index.html
          if (!path.startsWith('/assets/') && !path.includes('.') && path !== '/index.html') {
            return new Request(`${url.origin}/index.html`, req);
          }
          
          // For all other paths (including assets), use as-is
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
      
      // For SPA routing - serve index.html for routes that look like app routes
      if (!pathname.startsWith('/assets/') && 
          !pathname.includes('.') && 
          (pathname.startsWith('/shared/') || 
           pathname.startsWith('/preview') || 
           pathname.startsWith('/roadmap') ||
           pathname.startsWith('/guide'))) {
        try {
          console.log(`Serving index.html for SPA route: ${pathname}`);
          const indexRequest = new Request(`${url.origin}/index.html`, request);
          const indexResponse = await getAssetFromKV(
            { request: indexRequest, waitUntil: ctx.waitUntil.bind(ctx) },
            { ASSET_NAMESPACE: env.STATIC_ASSETS, ASSET_MANIFEST: assetManifest }
          );
          
          // Add proper headers for HTML
          const headers = new Headers(indexResponse.headers);
          headers.set('Content-Type', 'text/html; charset=utf-8');
          headers.set('Cache-Control', 'no-cache');
          
          return new Response(indexResponse.body, {
            status: 200,
            statusText: 'OK',
            headers
          });
        } catch (indexError) {
          console.error(`Error serving index.html for SPA route: ${indexError.message}`);
        }
      }
      
      return new Response('Not Found', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },

  // Handle API requests
  async handleApiRequest(request, env, pathname) {
    // Add CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Theme counter endpoints
      if (pathname === '/api/counter' && request.method === 'GET') {
        return this.getCounter(env, corsHeaders);
      }
      
      if (pathname === '/api/counter/increment' && request.method === 'POST') {
        return this.incrementCounter(env, corsHeaders);
      }

      return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('API Error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  // Get current counter value
  async getCounter(env, corsHeaders) {
    try {
      // Check if D1 database is available
      if (!env.THEME_DB) {
        console.warn('D1 database not configured, using fallback');
        return new Response(JSON.stringify({ 
          success: true, 
          count: 12847, 
          fallback: true,
          message: 'D1 database not configured',
          timestamp: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Initialize database if needed
      await this.initializeDatabase(env);

      const result = await env.THEME_DB.prepare(
        'SELECT count FROM theme_counter WHERE counter_key = ?'
      ).bind('total_themes_generated').first();

      const count = result ? result.count : 12847; // Fallback to initial value

      return new Response(JSON.stringify({ 
        success: true, 
        count: count,
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Error getting counter:', error);
      // Fallback response
      return new Response(JSON.stringify({ 
        success: true, 
        count: 12847, 
        fallback: true,
        error: error.message,
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  // Increment counter
  async incrementCounter(env, corsHeaders) {
    try {
      // Check if D1 database is available
      if (!env.THEME_DB) {
        console.warn('D1 database not configured, using fallback');
        return new Response(JSON.stringify({ 
          success: true, 
          count: 12848, 
          fallback: true,
          message: 'D1 database not configured',
          timestamp: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Initialize database if needed
      await this.initializeDatabase(env);

      // Use transaction to safely increment
      const result = await env.THEME_DB.prepare(`
        INSERT INTO theme_counter (counter_key, count, updated_at) 
        VALUES ('total_themes_generated', 1, CURRENT_TIMESTAMP)
        ON CONFLICT(counter_key) 
        DO UPDATE SET 
          count = count + 1,
          updated_at = CURRENT_TIMESTAMP
        RETURNING count
      `).first();

      const newCount = result ? result.count : 12848; // Fallback increment

      return new Response(JSON.stringify({ 
        success: true, 
        count: newCount,
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Error incrementing counter:', error);
      // Return success with fallback to prevent UI errors
      return new Response(JSON.stringify({ 
        success: true, 
        count: 12848, 
        fallback: true,
        error: error.message,
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  // Initialize database with required tables
  async initializeDatabase(env) {
    try {
      // Check if D1 is available
      if (!env.THEME_DB) {
        console.warn('D1 database binding not available');
        return;
      }

      await env.THEME_DB.prepare(`
        CREATE TABLE IF NOT EXISTS theme_counter (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          counter_key TEXT UNIQUE NOT NULL,
          count INTEGER NOT NULL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      await env.THEME_DB.prepare(`
        CREATE INDEX IF NOT EXISTS idx_counter_key ON theme_counter(counter_key)
      `).run();

      // Insert initial value if doesn't exist
      await env.THEME_DB.prepare(`
        INSERT OR IGNORE INTO theme_counter (counter_key, count) 
        VALUES ('total_themes_generated', 12847)
      `).run();

    } catch (error) {
      console.error('Database initialization error:', error);
      // Non-critical error - app should still work with fallback
    }
  }
};