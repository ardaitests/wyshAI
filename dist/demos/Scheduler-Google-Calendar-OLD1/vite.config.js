import { defineConfig } from 'vite';

export default defineConfig({
  base: '/demos/scheduler-google-calendar/',
  publicDir: 'public',
  root: '.',
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    emptyOutDir: true,
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      input: 'index.html',
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  preview: {
    port: 3000,
    open: true
  }
});
