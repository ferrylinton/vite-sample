import { readFile } from "node:fs/promises";
const ejs = require('ejs');
const { resolve } = require("node:path");


const ejsPlugin = () => {

    return {
        name: "ejs",
        configResolved(config) {
            console.log('configResolved...', config.command);
            console.log(config.build.rollupOptions.input);
        },

        transformIndexHtml: {
            order: 'pre',
            async handler(html, ctx) {
                return ejs.render(html, {
                    localsName: "env",
                    views: [resolve(__dirname, "src", "partials")],
                    filename: ctx.filename
                }).toString();
            },
        },
        handleHotUpdate: (context) => {
            console.log('handleHotUpdate.........');
        },
    }

}

module.exports = ejsPlugin;

