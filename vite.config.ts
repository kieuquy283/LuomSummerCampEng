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
        green: resolve(__dirname, 'trai-he-xanh.html'),
        tech: resolve(__dirname, 'trai-he-cong-nghe-ky-thuat.html'),
      },
    },
  },
});
