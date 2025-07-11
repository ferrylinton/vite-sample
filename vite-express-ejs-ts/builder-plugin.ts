import childProcess from 'child_process';
import fs from 'fs-extra';
import { PluginOption, build } from "vite";
import { sync } from "glob";

const cssFiles = sync("./src/assets/**/*.css".replace(/\\/g, "/"));
const jsFiles = sync("./src/assets/**/*.js".replace(/\\/g, "/"));
const ejsFiles = sync("./src/views/**/*.ejs".replace(/\\/g, "/"));
const ENTRY_NONE = "____.html";

const textToReplace = {};

function copy(src: string, dest: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.copy(src, dest, err => {
            return !!err ? rej(err) : res();
        });
    });
}

function remove(loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.remove(loc, err => {
            return !!err ? rej(err) : res();
        });
    });
}

function exec(cmd: string, loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
            if (!!stdout) {
                console.log(stdout);
            }
            if (!!stderr) {
                console.log(stderr);
            }
            return !!err ? rej(err) : res();
        });
    });
}


export function builderPlugin(): PluginOption {

    return [
        {
            name: "vite-plugin-builder:skip",
            enforce: "pre",
            apply: "build",
            config: () => {
                if (process.env.IS_BUILDER) return {};
                return {
                    build: {
                        copyPublicDir: false,
                        write: false,
                        rollupOptions: {
                            input: {
                                main: ENTRY_NONE,
                            },
                        },
                    },
                };
            },
            resolveId: (id) => {
                if (id === ENTRY_NONE) {
                    return id;
                }
                return null;
            },
            load: (id) => {
                if (id === ENTRY_NONE) {
                    return "";
                }
                return null;
            },
        },
        {
            name: 'vite-plugin-builder',
            enforce: "pre",
            apply: "build",
            buildStart: async () => {
                console.log('buildStart....');

                if (process.env.IS_BUILDER) return;
                process.env.IS_BUILDER = "true";

                await build({
                    ssr: {
                        external: [],
                        noExternal: [],
                    },
                    build: {
                        outDir: './dist',
                        ssr: './src/server.ts',
                        write: true,
                        minify: false,
                        target: "esnext",
                        emptyOutDir: false,
                        rollupOptions: {
                            output: {
                                format: "es",
                                entryFileNames: 'server.js',
                                chunkFileNames: "bin/[name]-[hash].js",
                                assetFileNames: "assets/[name]-[hash].[ext]",
                            },
                        },
                    },
                });

                await build({
                    build: {
                        copyPublicDir: false,
                        emptyOutDir: false,
                        write: true,
                        outDir: './dist',
                        ssr: false,
                        rollupOptions: {
                            input: [...cssFiles, ...jsFiles],
                            output: {
                                chunkFileNames: `assets/js/[name]-[hash].js`,
                                entryFileNames: `assets/js/[name]-[hash].js`,
                                assetFileNames: `assets/css/[name]-[hash].css`,
                            },
                        },
                    }
                });
            },

            async writeBundle(__options, bundle) {

                Object.entries(bundle).forEach(([key, value]) => {
                    if (key.endsWith('.js')) {
                        textToReplace[`assets/js/${value.name}.js`] = key;
                    } else if (key.endsWith('.css')) {
                        textToReplace[`assets/css/${(value as any).names[0]}`] = key;
                    }

                });

                for (let i = 0; i < ejsFiles.length; i++) {
                    console.log(ejsFiles[i]);
                    fs.readFile(ejsFiles[i], 'utf-8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                            return;
                        }

                        let newContent = data;

                        Object.entries(textToReplace).forEach(([key, value]) => {
                            newContent = newContent.replace(key as string, value as string);
                        });


                        fs.mkdirSync('./dist/views', { recursive: true })

                        fs.writeFile(ejsFiles[i].replace('src', 'dist'), newContent, 'utf-8', (err) => {
                            if (err) {
                                console.error('Error writing file:', err);
                                return;
                            }

                        });
                    });


                }
            },
        }
    ]
}