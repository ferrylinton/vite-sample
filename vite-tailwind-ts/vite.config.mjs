import { defineConfig } from "vite";
import { ejsBuilder } from "./ejs-builder-plugin";

export default defineConfig({
    server: {
        port: 3000
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: ['./node_modules/vite/dist/client/client.mjs', './node_modules/vite/dist/client/env.mjs'],
        },
    },
    root: "src",
    plugins: [
        ejsBuilder()
    ]
});