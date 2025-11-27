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

      // Shared Theme Endpoints
      if (pathname === '/api/themes/share' && request.method === 'POST') {
        return this.createSharedTheme(request, env, corsHeaders);
      }
      if (pathname.startsWith('/api/themes/share/') && request.method === 'GET') {
        const shareId = pathname.split('/').pop();
        return this.getSharedTheme(shareId, env, corsHeaders);
      }

      if (pathname === '/api/themes/shared' && request.method === 'GET') {
        return this.getUserSharedThemes(request, env, corsHeaders);
      }

      if (pathname.startsWith('/api/themes/share/') && request.method === 'DELETE') {
        const shareId = pathname.split('/').pop();
        return this.deleteSharedTheme(shareId, request, env, corsHeaders);
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

  // Helper: Get Unique Name
  async getUniqueName(env, table, userId, baseName) {
    let name = baseName;
    let counter = 2;
    while (true) {
      const query = `SELECT id FROM ${table} WHERE user_id = ? AND name = ?`;
      const existing = await env.THEME_DB.prepare(query).bind(userId, name).first();

      if (!existing) {
        return name;
      }

      name = `${baseName} (${counter})`;
      counter++;
    }
  },

  // Save Theme
  async saveTheme(request, env, corsHeaders) {
    try {
      const { userId, name, themeConfig, settings } = await request.json();

      if (!userId || !name || !themeConfig) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: corsHeaders });
      }

      await this.initializeDatabase(env);

      // Add settings column if it doesn't exist (migration)
      try {
        await env.THEME_DB.prepare('ALTER TABLE user_themes ADD COLUMN settings TEXT').run();
      } catch (e) {
        // Column likely exists
      }

      const id = crypto.randomUUID();

      // Check for duplicate names for this user
      const uniqueName = await this.getUniqueName(env, 'user_themes', userId, name);

      await env.THEME_DB.prepare(`
        INSERT INTO user_themes (id, user_id, name, config, settings, created_at)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(id, userId, uniqueName, JSON.stringify(themeConfig), settings ? JSON.stringify(settings) : null).run();

      return new Response(JSON.stringify({ success: true, id, name: uniqueName }), {
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

      // Ensure settings column exists
      try {
        await env.THEME_DB.prepare('ALTER TABLE user_themes ADD COLUMN settings TEXT').run();
      } catch (e) {
        // Column likely exists
      }

      const { results } = await env.THEME_DB.prepare(`
        SELECT * FROM user_themes WHERE user_id = ? ORDER BY created_at DESC
      `).bind(userId).all();

      return new Response(JSON.stringify({ success: true, themes: results }), {
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

  // Create Shared Theme
  async createSharedTheme(request, env, corsHeaders) {
    try {
      const { userId, themeConfig, name, description, isPublic, tags, expirationDays } = await request.json();

      // Debug logging
      console.log('[Worker] createSharedTheme - Received themeConfig:', JSON.stringify(themeConfig).substring(0, 500));
      console.log('[Worker] createSharedTheme - Light primary:', themeConfig?.colors?.light?.primary);
      console.log('[Worker] createSharedTheme - Settings:', themeConfig?.settings);

      if (!themeConfig || !name) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: corsHeaders });
      }

      await this.initializeDatabase(env);

      // Generate a short ID for sharing (12 chars)
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let shareId = '';
      for (let i = 0; i < 12; i++) {
        shareId += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      let expiresAt = null;
      if (expirationDays) {
        const date = new Date();
        date.setDate(date.getDate() + expirationDays);
        expiresAt = date.toISOString();
      }

      // Handle duplicate names if user is logged in
      let finalName = name;
      if (userId) {
        finalName = await this.getUniqueName(env, 'shared_themes', userId, name);
      }

      const configString = JSON.stringify(themeConfig);
      console.log('[Worker] createSharedTheme - Storing config length:', configString.length);

      await env.THEME_DB.prepare(`
        INSERT INTO shared_themes (id, user_id, name, description, config, is_public, tags, expires_at, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        shareId,
        userId || null,
        finalName,
        description || null,
        configString,
        isPublic ? 1 : 0,
        tags ? JSON.stringify(tags) : '[]',
        expiresAt
      ).run();

      console.log('[Worker] createSharedTheme - Successfully stored theme with shareId:', shareId);

      return new Response(JSON.stringify({ success: true, shareId, name: finalName }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('[Worker] createSharedTheme - Error:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
  },

  // Get Shared Theme
  async getSharedTheme(shareId, env, corsHeaders) {
    try {
      if (!shareId) {
        return new Response(JSON.stringify({ error: 'Missing shareId' }), { status: 400, headers: corsHeaders });
      }

      console.log('[Worker] getSharedTheme - Fetching shareId:', shareId);

      await this.initializeDatabase(env);

      // Increment view count
      await env.THEME_DB.prepare(`
        UPDATE shared_themes SET views = views + 1 WHERE id = ?
      `).bind(shareId).run();

      const result = await env.THEME_DB.prepare(`
        SELECT * FROM shared_themes WHERE id = ?
      `).bind(shareId).first();

      if (!result) {
        console.log('[Worker] getSharedTheme - Theme not found for shareId:', shareId);
        return new Response(JSON.stringify({ error: 'Theme not found' }), { status: 404, headers: corsHeaders });
      }

      // Check expiration
      if (result.expires_at && new Date(result.expires_at) < new Date()) {
        return new Response(JSON.stringify({ error: 'Theme expired' }), { status: 410, headers: corsHeaders });
      }

      // Parse the stored config
      const parsedConfig = JSON.parse(result.config);
      console.log('[Worker] getSharedTheme - Raw config length:', result.config.length);
      console.log('[Worker] getSharedTheme - Parsed light primary:', parsedConfig?.colors?.light?.primary);
      console.log('[Worker] getSharedTheme - Parsed settings:', parsedConfig?.settings);

      return new Response(JSON.stringify({
        success: true,
        theme: {
          ...result,
          config: parsedConfig,
          tags: JSON.parse(result.tags || '[]'),
          isPublic: !!result.is_public
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('[Worker] getSharedTheme - Error:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
  },

  // Get User Shared Themes
  async getUserSharedThemes(request, env, corsHeaders) {
    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId');

      if (!userId) {
        return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400, headers: corsHeaders });
      }

      await this.initializeDatabase(env);
      const results = await env.THEME_DB.prepare(`
        SELECT id as shareId, name as themeName, config, created_at as createdAt, views, is_public as isPublic 
        FROM shared_themes 
        WHERE user_id = ? 
        ORDER BY created_at DESC
      `).bind(userId).all();

      // Parse config and extract theme colors for display
      const themesWithColors = results.results.map(theme => {
        let themeColors = null;
        try {
          const config = JSON.parse(theme.config);
          if (config && config.colors && config.colors.light) {
            themeColors = {
              primary: config.colors.light.primary,
              secondary: config.colors.light.secondary,
              tertiary: config.colors.light.tertiary
            };
          }
        } catch (e) {
          console.error('Error parsing theme config:', e);
        }
        
        // Return theme without full config but with extracted colors
        return {
          shareId: theme.shareId,
          themeName: theme.themeName,
          createdAt: theme.createdAt,
          views: theme.views,
          isPublic: theme.isPublic,
          themeColors
        };
      });

      return new Response(JSON.stringify({ success: true, themes: themesWithColors }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
  },

  // Delete Shared Theme
  async deleteSharedTheme(shareId, request, env, corsHeaders) {
    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId');

      if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized deletion' }), { status: 401, headers: corsHeaders });
      }

      await this.initializeDatabase(env);

      const result = await env.THEME_DB.prepare(`
        DELETE FROM shared_themes WHERE id = ? AND user_id = ?
      `).bind(shareId, userId).run();

      if (result.success) {
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        return new Response(JSON.stringify({ error: 'Failed to delete or theme not found' }), { status: 404, headers: corsHeaders });
      }

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
        CREATE TABLE IF NOT EXISTS shared_themes (
          id TEXT PRIMARY KEY,
          user_id TEXT,
          name TEXT NOT NULL,
          description TEXT,
          config TEXT NOT NULL,
          is_public BOOLEAN DEFAULT 1,
          views INTEGER DEFAULT 0,
          tags TEXT DEFAULT '[]',
          expires_at DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      await env.THEME_DB.prepare(`
        CREATE INDEX IF NOT EXISTS idx_user_themes_user_id ON user_themes(user_id)
      `).run();

      await env.THEME_DB.prepare(`
        CREATE INDEX IF NOT EXISTS idx_shared_themes_user_id ON shared_themes(user_id)
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