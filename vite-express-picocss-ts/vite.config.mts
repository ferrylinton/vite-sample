import { defineConfig } from "vite";
import { ejsBuilder } from "./ejs-builder-plugin";


export default defineConfig({
    server: {
        port: 3000
    },
    plugins: [
        ejsBuilder()
    ]
});