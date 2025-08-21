import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import postcssPresetEnv from 'postcss-preset-env';
import postcssImport from 'postcss-import'
import postcssNesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssCustomProperties from 'postcss-custom-properties';
import calc from "postcss-calc";
import discardComment from "postcss-discard-comments";
import postcssRelativeColorSyntax from '@csstools/postcss-relative-color-syntax';
import postcssColorMod from 'postcss-color-mod-function';

export default {
  plugins: [
    autoprefixer(),
    postcssImport(),
    postcssColorMod(),
    discardComment({ removeAll: true }),
    postcssCustomProperties(),
    postcssRelativeColorSyntax(),
    calc(),
    postcssNesting({
      noIsPseudoSelector: true
    }),
    postcssPresetEnv({
      stage: 3,
      autoprefixer: { flexbox: "no-2009" },
      features: {
        'nesting-rules': false
      }
    }),
    process.env.NODE_ENV === 'production' ? purgeCSSPlugin({
      content: ['./src/views/**/*.ejs'],
      css: ['./assets/css/*.css'],
      fontFace: true,
      keyframes: true,
      variables: true,
      safelist: [
        /data-bs-theme$/, /is-active$/, /^modal-/, ':root', 'show'
      ],

    }) : null,
    process.env.NODE_ENV === 'production' ? cssnano : null,
  ].filter(Boolean)
}