import {defineNuxtConfig} from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        '@/assets/css/main.scss',
    ],
    modules: [
        '@nuxt/content',
        '@nuxt/image-edge',
    ],
    buildModules: [
        '@nuxtjs/google-fonts',
    ],
    content: {
        // https://content.nuxtjs.org/api/configuration
        documentDriven: true,
    },
    image: {
        // https://v1.image.nuxtjs.org/configuration
        screens: {
            xs: 320,
            sm: 640,
            md: 720,
            xl: 1080,
        },
        cloudinary: {
            baseURL: 'https://res.cloudinary.com/dey9hupke/image/upload/'
        }
    },
    googleFonts: {
        prefetch: true,
        preconnect: true,
        display: 'swap',
        families: {
            'Space Grotesk': {
                wght: [300, 400, 500, 600, 700],
            },
            'Libre Franklin': {
                wght: [500, 700, 900],
            }
        }
    },
    build: {
        analyze: true,
    },
    nitro: {
        prerender: {
            routes: ['/sitemap.xml', '/']
        }
    },
    hooks: {
        'vite:extendConfig'(clientConfig, {isClient}) {
            if (isClient) {
                clientConfig.build.rollupOptions.output.manualChunks = {
                    'threejs': ['three'],
                };
            }
        }
    },
})
