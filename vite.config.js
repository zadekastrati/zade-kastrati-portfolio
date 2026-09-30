import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
            // Only preload what the first screen paints (body text + the name in the hero);
            // the other weights still load, just without competing for first render.
            fonts: [
                bunny('Inter', { weights: [400, 500, 600], preload: [{ weight: 400 }] }),
                bunny('Space Grotesk', { weights: [500, 600, 700], preload: [{ weight: 700 }] }),
                bunny('JetBrains Mono', { weights: [400, 500], preload: false }),
            ],
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
