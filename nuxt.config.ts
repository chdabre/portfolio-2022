import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        '@/assets/css/main.scss',
    ],
    modules: [
        '@nuxt/content'
    ],
    buildModules: [
        '@nuxtjs/google-fonts',
    ],
    content: {
        // https://content.nuxtjs.org/api/configuration
    },
    googleFonts: {
        preload: true,
        prefetch: true,
        preconnect: true,
        families: {
            'Space Grotesk': {
                wght: [300, 400, 500, 600, 700],
            },
        }
    }
})
