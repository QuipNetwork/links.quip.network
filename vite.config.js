import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 3000,
        proxy: {
            '/api/luma': {
                target: 'https://api.lu.ma',
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/api\/luma/, ''); },
            },
        },
    },
    build: {
        outDir: 'dist',
    },
});
