import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import postcssPresetEnv from 'postcss-preset-env';

export default {
  plugins: [
    postcssPresetEnv({
      browsers: 'last 2 versions',
      stage: 0,
    }),
    purgeCSSPlugin({
      content: ['./src/views/**/*.ejs'],
      fontFace: true,
      keyframes: true,
      variables: true,
      safelist: [/data-theme$/]
    }),
  ]
}