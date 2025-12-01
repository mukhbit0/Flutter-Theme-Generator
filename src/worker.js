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
          pathname.startsWith('/guide') ||
          pathname.startsWith('/gallery'))) {
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

      // Gallery Endpoints
      if (pathname === '/api/gallery' && request.method === 'GET') {
        return this.getGalleryThemes(request, env, corsHeaders);
      }

      // Comment Endpoints
      if (pathname.startsWith('/api/comments/') && request.method === 'GET') {
        const themeId = pathname.split('/').pop();
        return this.getComments(themeId, env, corsHeaders);
      }
      if (pathname === '/api/comments' && request.method === 'POST') {
        return this.addComment(request, env, corsHeaders);
      }
      if (pathname.startsWith('/api/comments/') && request.method === 'DELETE') {
        const commentId = pathname.split('/').pop();
        return this.deleteComment(commentId, request, env, corsHeaders);
      }

      // Like Endpoints
      if (pathname === '/api/likes' && request.method === 'POST') {
        return this.toggleLike(request, env, corsHeaders);
      }
      if (pathname.startsWith('/api/likes/') && request.method === 'GET') {
        const themeId = pathname.split('/').pop();
        return this.getLikeStatus(themeId, request, env, corsHeaders);
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
        INSERT INTO shared_themes(id, user_id, name, description, config, is_public, tags, expires_at, author_name, author_photo_url, created_at)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `).bind(
        shareId,
        userId || null,
        finalName,
        description || null,
        configString,
        isPublic ? 1 : 0,
        tags ? JSON.stringify(tags) : '[]',
        expiresAt,
        authorName || null,
        authorPhotoUrl || null
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
          isPublic: !!result.is_public,
          authorName: result.author_name,
          authorPhotoUrl: result.author_photo_url
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
        SELECT id as shareId, name as themeName, config, created_at as createdAt, views, likes, is_public as isPublic, author_name as authorName, author_photo_url as authorPhotoUrl
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
          likes: theme.likes || 0,
          isPublic: theme.isPublic,
          authorName: theme.authorName,
          authorPhotoUrl: theme.authorPhotoUrl,
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

  // --- Gallery Functions ---

  async getGalleryThemes(request, env, corsHeaders) {
    try {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '12');
      const sort = url.searchParams.get('sort') || 'newest'; // newest, popular
      const search = url.searchParams.get('search') || '';

      const offset = (page - 1) * limit;

      await this.initializeDatabase(env);

      let query = `
        SELECT id, name, description, config, user_id, views, likes, created_at, tags, author_name, author_photo_url
        FROM shared_themes 
        WHERE is_public = 1
        `;

      const params = [];

      if (search) {
        query += ` AND(name LIKE ? OR description LIKE ? OR tags LIKE ?)`;
        const searchTerm = `% ${search}% `;
        params.push(searchTerm, searchTerm, searchTerm);
      }

      if (sort === 'popular') {
        query += ` ORDER BY likes DESC, views DESC`;
      } else {
        query += ` ORDER BY created_at DESC`;
      }

      query += ` LIMIT ? OFFSET ? `;
      params.push(limit, offset);

      const { results } = await env.THEME_DB.prepare(query).bind(...params).all();

      // Get total count for pagination
      let countQuery = `SELECT COUNT(*) as total FROM shared_themes WHERE is_public = 1`;
      const countParams = [];
      if (search) {
        countQuery += ` AND(name LIKE ? OR description LIKE ? OR tags LIKE ?)`;
        const searchTerm = `% ${search}% `;
        countParams.push(searchTerm, searchTerm, searchTerm);
      }
      const countResult = await env.THEME_DB.prepare(countQuery).bind(...countParams).first();

      // Process results to extract colors
      const themes = results.map(theme => {
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

        return {
          id: theme.id,
          name: theme.name,
          description: theme.description,
          userId: theme.user_id,
          views: theme.views,
          likes: theme.likes || 0,
          createdAt: theme.created_at,
          tags: JSON.parse(theme.tags || '[]'),
          authorName: theme.author_name,
          authorPhotoUrl: theme.author_photo_url,
          themeColors
        };
      });

      return new Response(JSON.stringify({
        success: true,
        themes,
        pagination: {
          page,
          limit,
          total: countResult.total,
          pages: Math.ceil(countResult.total / limit)
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('[Worker] getGalleryThemes - Error:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
  },

  // --- Comment Functions ---

  async getComments(themeId, env, corsHeaders) {
    try {
      if (!themeId) {
        return new Response(JSON.stringify({ error: 'Missing themeId' }), { status: 400, headers: corsHeaders });
      }

      await this.initializeDatabase(env);

      const { results } = await env.THEME_DB.prepare(`
      SELECT * FROM comments WHERE theme_id = ? ORDER BY created_at DESC
        `).bind(themeId).all();

      return new Response(JSON.stringify({ success: true, comments: results }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
  },

  async addComment(request, env, corsHeaders) {
    try {
      const { themeId, userId, userName, content, parentId } = await request.json();

      if (!themeId || !userId || !content) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: corsHeaders });
      }

      await this.initializeDatabase(env);

      const id = crypto.randomUUID();

      await env.THEME_DB.prepare(`
        INSERT INTO comments(id, theme_id, user_id, user_name, content, parent_id, created_at)
      VALUES(?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `).bind(id, themeId, userId, userName || 'Anonymous', content, parentId || null).run();

      return new Response(JSON.stringify({ success: true, id }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
  },

  async deleteComment(commentId, request, env, corsHeaders) {
    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId');

      if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });
      }

      await this.initializeDatabase(env);

      const result = await env.THEME_DB.prepare(`
        DELETE FROM comments WHERE id = ? AND user_id = ?
        `).bind(commentId, userId).run();

      if (result.success) {
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } else {
        return new Response(JSON.stringify({ error: 'Failed to delete' }), { status: 404, headers: corsHeaders });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
  },

  // --- Like Functions ---

  async toggleLike(request, env, corsHeaders) {
    try {
      const { themeId, userId } = await request.json();

      if (!themeId || !userId) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: corsHeaders });
      }

      await this.initializeDatabase(env);

      // Check if already liked
      const existing = await env.THEME_DB.prepare(`
        SELECT * FROM likes WHERE user_id = ? AND theme_id = ?
        `).bind(userId, themeId).first();

      let liked = false;

      if (existing) {
        // Unlike
        await env.THEME_DB.batch([
          env.THEME_DB.prepare('DELETE FROM likes WHERE user_id = ? AND theme_id = ?').bind(userId, themeId),
          env.THEME_DB.prepare('UPDATE shared_themes SET likes = likes - 1 WHERE id = ?').bind(themeId)
        ]);
        liked = false;
      } else {
        // Like
        await env.THEME_DB.batch([
          env.THEME_DB.prepare('INSERT INTO likes (user_id, theme_id) VALUES (?, ?)').bind(userId, themeId),
          env.THEME_DB.prepare('UPDATE shared_themes SET likes = likes + 1 WHERE id = ?').bind(themeId)
        ]);
        liked = true;
      }

      // Get updated count
      const theme = await env.THEME_DB.prepare('SELECT likes FROM shared_themes WHERE id = ?').bind(themeId).first();

      return new Response(JSON.stringify({ success: true, liked, likes: theme ? theme.likes : 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
    }
  },

  async getLikeStatus(themeId, request, env, corsHeaders) {
    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId');

      await this.initializeDatabase(env);

      const theme = await env.THEME_DB.prepare('SELECT likes FROM shared_themes WHERE id = ?').bind(themeId).first();

      let liked = false;
      if (userId) {
        const likeRecord = await env.THEME_DB.prepare('SELECT * FROM likes WHERE user_id = ? AND theme_id = ?').bind(userId, themeId).first();
        liked = !!likeRecord;
      }

      return new Response(JSON.stringify({ success: true, likes: theme ? theme.likes : 0, liked }), {
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
        CREATE TABLE IF NOT EXISTS theme_counter(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          counter_key TEXT UNIQUE NOT NULL,
          count INTEGER NOT NULL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `).run();

      await env.THEME_DB.prepare(`
        CREATE TABLE IF NOT EXISTS user_themes(
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          name TEXT NOT NULL,
          config TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `).run();

      await env.THEME_DB.prepare(`
        CREATE TABLE IF NOT EXISTS shared_themes(
          id TEXT PRIMARY KEY,
          user_id TEXT,
          name TEXT NOT NULL,
          description TEXT,
          config TEXT NOT NULL,
          is_public BOOLEAN DEFAULT 1,
          views INTEGER DEFAULT 0,
          tags TEXT DEFAULT '[]',
          expires_at DATETIME,
          author_name TEXT,
          author_photo_url TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `).run();

      await env.THEME_DB.prepare(`
        CREATE INDEX IF NOT EXISTS idx_user_themes_user_id ON user_themes(user_id)
        `).run();

      await env.THEME_DB.prepare(`
        CREATE INDEX IF NOT EXISTS idx_shared_themes_user_id ON shared_themes(user_id)
        `).run();

      // Create Comments Table
      await env.THEME_DB.prepare(`
        CREATE TABLE IF NOT EXISTS comments(
          id TEXT PRIMARY KEY,
          theme_id TEXT NOT NULL,
          user_id TEXT NOT NULL,
          user_name TEXT NOT NULL,
          content TEXT NOT NULL,
          parent_id TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `).run();

      await env.THEME_DB.prepare(`
        CREATE INDEX IF NOT EXISTS idx_comments_theme_id ON comments(theme_id)
        `).run();

      // Create Likes Table
      await env.THEME_DB.prepare(`
        CREATE TABLE IF NOT EXISTS likes(
          user_id TEXT NOT NULL,
          theme_id TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY(user_id, theme_id)
        )
        `).run();

      await env.THEME_DB.prepare(`
        CREATE INDEX IF NOT EXISTS idx_likes_theme_id ON likes(theme_id)
        `).run();

      // Add likes column to shared_themes if it doesn't exist
      try {
        await env.THEME_DB.prepare('ALTER TABLE shared_themes ADD COLUMN likes INTEGER DEFAULT 0').run();
      } catch (e) {
        // Column likely exists
      }

      // Add parent_id column to comments if it doesn't exist
      try {
        await env.THEME_DB.prepare('ALTER TABLE comments ADD COLUMN parent_id TEXT').run();
      } catch (e) {
        // Column likely exists
      }

      // Add author_name and author_photo_url columns to shared_themes if they don't exist
      try {
        await env.THEME_DB.prepare('ALTER TABLE shared_themes ADD COLUMN author_name TEXT').run();
      } catch (e) {
        // Column likely exists
      }
      try {
        await env.THEME_DB.prepare('ALTER TABLE shared_themes ADD COLUMN author_photo_url TEXT').run();
      } catch (e) {
        // Column likely exists
      }

      // Insert initial value if doesn't exist
      await env.THEME_DB.prepare(`
        INSERT OR IGNORE INTO theme_counter(counter_key, count)
      VALUES('total_themes_generated', 12847)
        `).run();

    } catch (error) {
      console.error('Database initialization error:', error);
    }
  }
};
```