import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    purgeCSSPlugin({
      content: ['./src/views/**/*.ejs']
    })
  ]
}