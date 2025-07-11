import { defineConfig } from 'vite';
import { builderPlugin } from './builder-plugin';

export default defineConfig((config) => {

    return {
        plugins: [
            builderPlugin(),
        ],
    }
})