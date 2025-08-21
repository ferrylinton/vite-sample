console.log('xxxxxxxxxxx');

import postcss from 'postcss';
import postcssColorMod from 'postcss-color-mod-function';
import fs from 'fs';

const css = fs.readFileSync("./src/assets/css/variables.css", 'utf-8');

postcss([
    postcssColorMod()
])
    .process(css)
    .then(result => {
        console.log(result);
        fs.writeFileSync('./dist/variable.css', result.css, 'utf-8');
        if (result.map) {
            fs.writeFileSync('./dist/variable.css.map', result.map.toString(), 'utf-8');
        }
    })
