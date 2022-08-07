import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    mode:'universal',

    buildModules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt'

    ],
    css: [
        // CSS file in the project
        '~/assets/css/reset.css',
        '~/assets/css/main.css',
    ],
    app:{

        head:{
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/assets/img/favicon.ico' },
            ],
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
            charset: 'utf-8',
            meta: [
                { name: 'description', content: 'Dmytro Afanasiev test nuxt3+tailwind with SSR project' }
            ],

        }
    }
})
