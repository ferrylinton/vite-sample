import path from "path";
import { defineConfig } from "vite";


export default defineConfig((__config) => {
    return {
        resolve: {
            alias: {
                '~bootstrap': path.resolve(import.meta.dirname, 'node_modules/bootstrap')
            },
        },
        build: {
            copyPublicDir: false,
            emptyOutDir: false,
            write: true,
            outDir: 'src',
            ssr: false,
            minify: false,
            cssMinify: false,
            rollupOptions: {
                input: {
                    "bootstrap-default": './src/assets/scss/bootstrap-default/theme.scss',
                    "bootstrap-darkly": './src/assets/scss/bootstrap-darkly/theme.scss'
                },
                output: {
                    chunkFileNames: `assets/js/[name].js`,
                    entryFileNames: `assets/js/[name].js`,
                    assetFileNames: `assets/css/[name].css`,
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: [
                        'import',
                        'mixed-decls',
                        'color-functions',
                        'global-builtin',
                        'legacy-js-api',
                    ],
                },
            },
        },
    }
});