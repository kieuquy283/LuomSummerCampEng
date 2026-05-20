import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        digital: resolve(__dirname, 'binh-dan-hoc-vu-so.html'),
        english: resolve(__dirname, 'ao-xanh-anh-ngu.html'),
      },
    },
  },
});
