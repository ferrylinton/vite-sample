import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import postcssPresetEnv from 'postcss-preset-env';
import postcssImport from 'postcss-import'
import postcssNesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
  plugins: [
    autoprefixer,
    process.env.NODE_ENV === 'production' ? cssnano : null,
    postcssImport(),
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
      fontFace: true,
      keyframes: true,
      variables: true,
      safelist: [
        /data-bs-theme$/, /is-active$/, /^modal-/, ':root', 'show'
      ],

    }) : null,
  ].filter(Boolean)
}