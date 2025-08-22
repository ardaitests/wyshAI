import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    base: isProduction ? '/demos/Scheduler-Google-Calendar/' : '/',
    publicDir: 'public',
    build: {
      outDir: 'dist',
      assetsDir: '',
      emptyOutDir: true,
      sourcemap: false,
      minify: false,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        },
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name][extname]'
        }
      }
    },
    server: {
      port: 3000,
      open: true,
      host: true,
      cors: true,
      fs: {
        strict: false
      }
    },
    preview: {
      port: 3000,
      open: true,
      cors: true
    },
    optimizeDeps: {
      include: []
    },
    esbuild: {
      jsx: 'automatic'
    }
  };
});
