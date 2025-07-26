# 🚀 Cloudflare Workers Deployment Guide

This guide explains how to deploy the Flutter Theme Generator to Cloudflare Workers using the Cloudflare Dashboard.

## 📋 Prerequisites

- Cloudflare account (free tier works)
- Git repository on GitHub
- Node.js 18+ installed locally (for testing)

## 🎯 Deployment Methods

### Method 1: Cloudflare Dashboard (Recommended)

1. **Connect Your Repository**
   - Go to https://dash.cloudflare.com
   - Navigate to **Workers & Pages** > **Create Application**
   - Select **Pages** > **Connect to Git**
   - Choose your GitHub repository: `Flutter-Theme-Generator`

2. **Configure Build Settings**
   ```
   Framework preset: None
   Build command: npm run build
   Build output directory: dist
   Root directory: (leave empty)
   ```

3. **Environment Variables** (Optional)
   ```
   NODE_ENV = production
   ```

4. **Advanced Settings**
   - Node.js version: 18 or higher
   - Install command: npm install

5. **Deploy**
   - Click **Save and Deploy**
   - Your site will be available at: `https://flutter-theme-generator-xxx.pages.dev`

### Method 2: Command Line (Alternative)

If you prefer command line deployment:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Cloudflare Workers
npm run deploy
```

## 🔧 Configuration Files

### wrangler.toml
```toml
name = "flutter-theme-generator"
main = "src/worker.js"
compatibility_date = "2025-07-27"
compatibility_flags = ["nodejs_compat"]

[site]
bucket = "./dist"

[env.production.vars]
ENVIRONMENT = "production"
```

### worker.js
- ES Module format with `export default`
- Handles SPA routing
- Serves static assets from KV storage
- CORS support included

## 🌐 Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to your Pages project settings
   - Navigate to **Custom domains**
   - Click **Set up a custom domain**
   - Enter your domain (e.g., `themes.yourdomain.com`)

2. **DNS Configuration**
   - Add a CNAME record pointing to your Pages domain
   - Cloudflare will automatically provision SSL

## 📊 Features Included

- ✅ **SPA Routing**: Proper handling of React Router routes
- ✅ **Asset Optimization**: Automatic compression and caching
- ✅ **Global CDN**: Served from 300+ Cloudflare locations
- ✅ **HTTPS**: Automatic SSL certificate
- ✅ **Analytics**: Built-in web analytics (optional)

## 🔍 Troubleshooting

### Build Fails
- Ensure Node.js version is 18+
- Check that all dependencies are in `package.json`
- Verify build command: `npm run build`

### Worker Errors
- Update wrangler to latest version: `npm install wrangler@latest`
- Ensure worker.js uses ES Module format
- Check compatibility flags in wrangler.toml

### Routing Issues
- Verify `_redirects` file for SPA routing
- Check worker.js handles non-asset requests

## 📈 Performance

Expected performance metrics:
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Global availability**: 99.99%+

## 🔒 Security

Security features included:
- HTTPS enforcement
- CORS headers configured
- Content Security Policy ready
- DDoS protection via Cloudflare

## 📞 Support

For deployment issues:
1. Check [Cloudflare Pages docs](https://developers.cloudflare.com/pages/)
2. Review [Cloudflare Workers docs](https://developers.cloudflare.com/workers/)
3. Open an issue on the GitHub repository

---

**Note**: After deployment, test the theme generator functionality including:
- Logo upload and color extraction
- Theme preview with real-time editing
- ZIP file download with generated Flutter code
