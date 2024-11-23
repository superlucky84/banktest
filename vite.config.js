import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,ts}"',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: false,
    sourcemap: true,
  },
  server: {
    open: '/index.html',
  },
  test: {
    environment: 'jsdom',
    include: ['src/tests/**/*.{js,ts,js,ts}'],
    setupFiles: './test/setup.ts',
    globals: true,
  },
});
