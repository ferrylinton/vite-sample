import { defineConfig } from "vite";
import { ejsBuilder } from "./ejs-builder-plugin";


export default defineConfig((config) => {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log(import.meta.env);
    console.log(import.meta.env?.PROD);
    
    return {
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
    }
});