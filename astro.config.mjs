import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import CompressionPlugin from "vite-plugin-compression";
import sitemap from "@astrojs/sitemap";
// https://astro.build/config
export default defineConfig({
    i18n: {
        defaultLocale: "en",
        locales: ["en", "ru"],
        routing: {
            prefixDefaultLocale: false,
        }
    },
    site: "https://ivanzakutnii.com",
    integrations: [
        react(),
        sitemap({
            filter: (page) => page !== 'https://ivanzakutnii.com/404/' &&
                !page.includes('/404.html') &&
                !page.includes('/404/') &&
                !page.includes('/.html')
        }),
    ],
    renderers: ["@astrojs/renderer-react"],
    vite: {
        plugins: [CompressionPlugin()],
    },
    buildOptions: {
        minify: true,
    },
});
