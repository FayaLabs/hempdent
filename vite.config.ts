import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import sourceId from './vite-plugin-source-id'

export default defineConfig({
  plugins: [sourceId(), react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
  optimizeDeps: {
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
    cors: true,
    allowedHosts: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    },
  },
})
