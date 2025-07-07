const { sync } = require("glob");
const { resolve } = require("node:path");
const ejsPlugin = require('./ejs-plugin');


export default {
    root: resolve(__dirname, 'src'),
    resolve: {
        alias: {
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
    plugins: [
        ejsPlugin(),
    ],
    build: {
        emptyOutDir: true,
        outDir: '../dist',
        rollupOptions: {
            input: sync("./src/**/*.html".replace(/\\/g, "/"), { ignore: 'src/partials/**' }),
        }
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
    server: {
        port: 8080,
        hot: true
    }
}