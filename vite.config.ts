import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  // Inject AdSense env vars at build time with fallbacks.
  // Set VITE_ADSENSE_PUB_ID etc. in Cloudflare Workers build env vars
  // to override. Falls back to real values so ads always work.
  define: {
    'import.meta.env.VITE_ADSENSE_PUB_ID': JSON.stringify(
      process.env.VITE_ADSENSE_PUB_ID ?? 'ca-pub-8815716293145789'
    ),
    'import.meta.env.VITE_AD_SLOT_BANNER': JSON.stringify(
      process.env.VITE_AD_SLOT_BANNER ?? '2227580492'
    ),
    'import.meta.env.VITE_AD_SLOT_GRID': JSON.stringify(
      process.env.VITE_AD_SLOT_GRID ?? '8026702080'
    ),
    'import.meta.env.VITE_AD_SLOT_SIDEBAR': JSON.stringify(
      process.env.VITE_AD_SLOT_SIDEBAR ?? '5400538741'
    ),
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2015',
    minify: true,
    // Ensure consistent asset naming
    rollupOptions: {
      output: {
        // Use simple hash format that matches Cloudflare Workers expectations
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  publicDir: 'public',
  // Use absolute base path for Cloudflare Workers
  base: '/'
})