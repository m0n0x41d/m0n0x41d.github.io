import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import CompressionPlugin from "vite-plugin-compression";
// https://astro.build/config
export default defineConfig({
    i18n: {
        defaultLocale: "en",
        locales: ["en", "ru"],
        routing: {
            prefixDefaultLocale: false,
        }
    },
    integrations: [react()],
    renderers: ["@astrojs/renderer-react"],
    prerender: true,
    vite: {
        plugins: [CompressionPlugin()],
    },
    buildOptions: {
        minify: true,
    },
});
