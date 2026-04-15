import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const port = parseInt(process.env.PORT || '5173', 10);
    return {
      server: {
        port,
        host: '0.0.0.0',
        allowedHosts: ['mywebapp03-d9fffxh5avayg9bk.southindia-01.azurewebsites.net', 'localhost'],
        proxy: {
          '/api': 'http://localhost:8080',
        },
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
