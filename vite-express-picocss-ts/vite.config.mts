import { defineConfig } from "vite";
import concat from '@vituum/vite-plugin-concat';
import { ejsBuilder } from "./ejs-builder-plugin";
import { VitePluginNode } from 'vite-plugin-node';


export default defineConfig({
    build: {
        copyPublicDir: true,
        emptyOutDir: false,
        write: true,
        outDir: 'dist',
        ssr: false,
        rollupOptions: {
            input: [
                './src/assets/js/main.js',
                './src/assets/css/main.css'
            ],
            output: {
                chunkFileNames: `assets/js/[name]-[hash].js`,
                entryFileNames: `assets/js/[name]-[hash].js`,
                assetFileNames: `assets/css/[name]-[hash].css`,
            },
        },
    },
    server: {
        port: 3000
    },
    plugins: [
        ejsBuilder()
    ]
});