<template>
  <NuxtPage :key="$route.fullPath"/>
</template>

<script lang="ts" setup>
import {useHead} from "#head";

useHead({
  titleTemplate: '%s | Dario Breitenstein',
  meta: [
    { name: 'description', content: 'I am a designer, engineer and artist building bridges between the digital and physical world.\n Based in Zürich, Switzerland.'},
    { name: 'msapplication-TileColor', content: '#ffffff' },
    { name: 'theme-color', content: '#ffffff' },
  ],
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#ffffff' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
});
</script>
