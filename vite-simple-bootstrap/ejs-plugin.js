import { readFile } from "node:fs/promises";
import fs from 'fs-extra';
import childProcess from 'child_process';
const ejs = require('ejs');
const { resolve } = require("node:path");


const ejsPlugin = () => {

    return {
        name: "ejs",
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
        generateBundle(outputOptions, bundle) {
            console.log('generateBundle...');
            for (const [fileName, bundleValue] of Object.entries(bundle)) {
                console.log(fileName);
                console.log(bundleValue);
                if (fileName.endsWith('index.js')) {
                    // ... logic to generate localized versions
                }
            }
            
        }
    }

}

module.exports = ejsPlugin;

