import { execa } from 'execa';
import fse from 'fs-extra';
import { sync } from "glob";
import { OutputBundle } from "rollup";
import { build, PluginOption } from "vite";
import { viteNodeApp as app } from './src/app';

const ejsFiles = sync("./src/views/**/*.ejs".replace(/\\/g, "/"));
const DIST_FOLDER = 'dist';


async function copyEjsFiles(bundle: OutputBundle) {
    for (let i = 0; i < ejsFiles.length; i++) {
        let file = ejsFiles[i].replace('src', DIST_FOLDER);
        let content = fse.readFileSync(ejsFiles[i], 'utf-8');

        Object.entries(bundle).forEach(([key, value]) => {
            let searchValue = '';

            if (key.endsWith('.js')) {
                searchValue = `assets/js/${value.name}.js`;
            } else if (key.endsWith('.css')) {
                searchValue = `assets/css/${(value as any).names[0]}`;
            }

            content = content.replace(searchValue, key);
        });

        fse.outputFileSync(file, content, 'utf-8');
    }
}

async function buildBackend() {
    await build({
        ssr: {
            external: [],
            noExternal: [],
        },
        build: {
            outDir: DIST_FOLDER,
            ssr: './src/server.ts',
            write: true,
            minify: false,
            target: "esnext",
            emptyOutDir: false,
            rollupOptions: {
                output: {
                    format: "cjs",
                    entryFileNames: 'server.js',
                    chunkFileNames: "bin/[name]-[hash].js",
                    assetFileNames: "assets/[name]-[hash].[ext]",
                },
            },
        },
    });
}

export const ejsBuilder = (): PluginOption => {

    return [
        {
            name: "ejs-builder-plugin:skip",
            enforce: "pre",
            apply: "build",
            config: () => {
                if (process.env.IS_BUILDER) return {};  
            },
        },
        {
            name: "ejs-builder-plugin:serve",
            enforce: "pre",
            apply: "serve",
            async configureServer(server) {
                server.middlewares.use(app);
            }
        },
        {
            name: 'ejs-builder-plugin:build',
            enforce: "pre",
            apply: "build",
            buildStart: async () => {
                if (process.env.IS_BUILDER) return;
                process.env.IS_BUILDER = "true";

                await buildBackend();

                fse.copySync('src/favicon.ico', `${DIST_FOLDER}/favicon.ico`);
                fse.copySync('src/assets/image', `${DIST_FOLDER}/assets/image`);

                fse.copySync('package.json', `${DIST_FOLDER}/package.json`);
                await execa({ cwd: DIST_FOLDER })`npm pkg delete devDependencies`;
                await execa({ cwd: DIST_FOLDER })`npm pkg set type=commonjs`;
            },

            async writeBundle(__options, bundle) {
                copyEjsFiles(bundle);
            },
        }
    ]

}