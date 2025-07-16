import { BuilderOptions, PluginOption } from "vite";

export const ejsBuilder = (opts: BuilderOptions): PluginOption => {

    return [
        {
            name: "ejs-builder-plugin:build",
            enforce: "pre",
            apply: "build",
            config: () => {
                console.log('....config:build');
            },
            async configResolved(config) {
                console.log('....configResolved:build');
            },
            async transform(code, id) {
                console.log('\n....transform:build : ', id);
                return code;
            },
            async writeBundle() {
                console.log('....writeBundle:build')
            },
            async configureServer(server){
                console.log('....configureServer:build')
            },
        },
        {
            name: "ejs-builder-plugin:serve",
            enforce: "pre",
            apply: "serve",
            config: () => {
                console.log('....config:serve');
            },
            async configResolved(config) {
                console.log('....configResolved:serve')
            },
            async transform(code, id) {
                console.log('\n....transform:serve : ', id);
                return code;
            },
            async writeBundle() {
                console.log('....writeBundle:serve')
            },
            async configureServer(server){
                console.log('....configureServer:serve');
            },
        }
    ]

}