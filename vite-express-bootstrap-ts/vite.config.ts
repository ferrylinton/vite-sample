import path from "path";
import { defineConfig } from "vite";
import { ejsBuilder } from "./ejs-builder-plugin";


export default defineConfig((__config) => {
    return {
        resolve: {
            alias: {
                '@': path.resolve(import.meta.dirname, 'src')
            },
        },
        build: {
            copyPublicDir: true,
            emptyOutDir: false,
            write: true,
            outDir: 'dist',
            ssr: false,
            rollupOptions: {
                input: [
                    './src/assets/js/main.ts',
                ],
                output: {
                    chunkFileNames: `assets/js/[name]-[hash].js`,
                    entryFileNames: `assets/js/[name]-[hash].js`,
                    assetFileNames: `assets/css/[name]-[hash].css`,
                },
            },
        },
        server: {
            port: 3000,
            watch: {
                usePolling: true
            },
            hmr: {
                host: 'localhost',
            },
        },
        plugins: [
            ejsBuilder()
        ]
    }
});