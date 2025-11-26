import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

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
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

      // User Theme Endpoints
      if (pathname === '/api/themes/save' && request.method === 'POST') {
        return this.saveTheme(request, env, corsHeaders);
      }

      if (pathname === '/api/themes/list' && request.method === 'GET') {
        return this.getUserThemes(request, env, corsHeaders);
      }

      if (pathname === '/api/themes/delete' && request.method === 'DELETE') {
        return this.deleteTheme(request, env, corsHeaders);
      }

      // Config Endpoint (Runtime Secrets)
      if (pathname === '/api/config' && request.method === 'GET') {
        return new Response(JSON.stringify({
          VITE_FIREBASE_API_KEY: env.VITE_FIREBASE_API_KEY,
          VITE_FIREBASE_AUTH_DOMAIN: env.VITE_FIREBASE_AUTH_DOMAIN,
          VITE_FIREBASE_PROJECT_ID: env.VITE_FIREBASE_PROJECT_ID,
          VITE_FIREBASE_STORAGE_BUCKET: env.VITE_FIREBASE_STORAGE_BUCKET,
          VITE_FIREBASE_MESSAGING_SENDER_ID: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          VITE_FIREBASE_APP_ID: env.VITE_FIREBASE_APP_ID,
          VITE_FIREBASE_MEASUREMENT_ID: env.VITE_FIREBASE_MEASUREMENT_ID
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
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
      if (!env.THEME_DB) throw new Error('D1 database not configured');
      await this.initializeDatabase(env);
      const result = await env.THEME_DB.prepare(
        'SELECT count FROM theme_counter WHERE counter_key = ?'
      ).bind('total_themes_generated').first();
      return new Response(JSON.stringify({ success: true, count: result ? result.count : 12847 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: true, count: 12847, error: error.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  // Increment counter
  async incrementCounter(env, corsHeaders) {
    try {
      if (!env.THEME_DB) throw new Error('D1 database not configured');
      await this.initializeDatabase(env);
      const result = await env.THEME_DB.prepare(`
        INSERT INTO theme_counter (counter_key, count, updated_at) 
        VALUES ('total_themes_generated', 1, CURRENT_TIMESTAMP)
        ON CONFLICT(counter_key) 
        DO UPDATE SET count = count + 1, updated_at = CURRENT_TIMESTAMP
        RETURNING count
      `).first();
      return new Response(JSON.stringify({ success: true, count: result ? result.count : 12848 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: true, count: 12848, error: error.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },

  // Save Theme
  async saveTheme(request, env, corsHeaders) {
    try {
      const { userId, themeConfig, name } = await request.json();
      if (!userId || !themeConfig || !name) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: corsHeaders });
      }

      await this.initializeDatabase(env);

      const id = crypto.randomUUID();
      await env.THEME_DB.prepare(`
        INSERT INTO user_themes (id, user_id, name, config, created_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(id, userId, name, JSON.stringify(themeConfig)).run();

      return new Response(JSON.stringify({ success: true, id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
  },

  // Get User Themes
  async getUserThemes(request, env, corsHeaders) {
    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId');
      if (!userId) {
        return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400, headers: corsHeaders });
      }

      await this.initializeDatabase(env);
      const results = await env.THEME_DB.prepare(`
        SELECT * FROM user_themes WHERE user_id = ? ORDER BY created_at DESC
      `).bind(userId).all();

      return new Response(JSON.stringify({ success: true, themes: results.results }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
  },

  // Delete Theme
  async deleteTheme(request, env, corsHeaders) {
    try {
      const url = new URL(request.url);
      const themeId = url.searchParams.get('id');
      const userId = url.searchParams.get('userId'); // Simple ownership check

      if (!themeId || !userId) {
        return new Response(JSON.stringify({ error: 'Missing id or userId' }), { status: 400, headers: corsHeaders });
      }

      await this.initializeDatabase(env);
      await env.THEME_DB.prepare(`
        DELETE FROM user_themes WHERE id = ? AND user_id = ?
      `).bind(themeId, userId).run();

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
  },

  // Initialize database with required tables
  async initializeDatabase(env) {
    try {
      if (!env.THEME_DB) return;

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
        CREATE TABLE IF NOT EXISTS user_themes (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          name TEXT NOT NULL,
          config TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      await env.THEME_DB.prepare(`
        CREATE INDEX IF NOT EXISTS idx_user_themes_user_id ON user_themes(user_id)
      `).run();

      // Insert initial value if doesn't exist
      await env.THEME_DB.prepare(`
        INSERT OR IGNORE INTO theme_counter (counter_key, count) 
        VALUES ('total_themes_generated', 12847)
      `).run();

    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }
};