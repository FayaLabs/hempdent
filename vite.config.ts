import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import sourceId from './vite-plugin-source-id'

// @fayz-ai/* come from published npm (node_modules) — EXCEPT plugin-blog, which
// we resolve from the local SDK checkout (../../fayz-sdk-qa, like dentist/school)
// because only that source carries createBlogPlugin({ tenantId }) + the
// tenant-scoped Supabase provider that reads v_public_blog_posts. It imports
// only @fayz-ai/core (node_modules) + react/router/lucide (deduped), so there is
// no dual-core/dual-React hazard.
const FAYZ_SDK = path.resolve(__dirname, '../../fayz-sdk-qa')
const BLOG_SRC = path.resolve(FAYZ_SDK, 'plugins/plugin-blog/src')

// Resolves @fayz-ai/* from the published npm packages (node_modules). react +
// react-router-dom + zustand are deduped so the plugin components share the
// app's single React/router/store instance (contexts work across the boundary).
export default defineConfig({
  plugins: [sourceId(), react()],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom', 'zustand'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@fayz-ai/plugin-blog': BLOG_SRC,
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
  optimizeDeps: {
    // The plugin-blog alias points at raw TS source — let Vite compile it inline
    // instead of pre-bundling (which would choke on the out-of-root workspace).
    exclude: ['@fayz-ai/plugin-blog'],
    include: [
      'react', 'react-dom', 'react-router-dom',
      'clsx', 'tailwind-merge', 'class-variance-authority',
      'lucide-react', 'date-fns', 'framer-motion',
      'sonner', 'recharts', 'embla-carousel-react',
      '@radix-ui/react-slot', '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu', '@radix-ui/react-select',
      '@radix-ui/react-tabs', '@radix-ui/react-tooltip',
      '@radix-ui/react-popover', '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox', '@radix-ui/react-label',
      '@radix-ui/react-separator', '@radix-ui/react-switch',
      '@radix-ui/react-scroll-area', '@radix-ui/react-progress',
      '@radix-ui/react-accordion', '@radix-ui/react-alert-dialog',
      '@radix-ui/react-aspect-ratio', '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu', '@radix-ui/react-hover-card',
      '@radix-ui/react-menubar', '@radix-ui/react-navigation-menu',
      '@radix-ui/react-radio-group', '@radix-ui/react-slider',
      '@radix-ui/react-toggle', '@radix-ui/react-toggle-group',
      '@hookform/resolvers', 'react-hook-form', 'zod',
      'react-day-picker', 'vaul', 'react-resizable-panels',
      'cmdk', 'input-otp',
    ],
  },
  build: {
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === 'MISSING_EXPORT') throw new Error(warning.message)
        defaultHandler(warning)
      },
    },
  },
  server: {
    host: true,
    port: 5307,
    strictPort: true,
    cors: true,
    allowedHosts: true,
    // Allow serving the aliased plugin-blog source from the sibling SDK checkout.
    fs: { allow: [path.resolve(__dirname), FAYZ_SDK] },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    },
  },
})
