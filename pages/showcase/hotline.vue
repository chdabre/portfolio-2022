<template>
  <div class="page">
    <header class="subpage-header" :style="{ background: page.color }">
      <nuxt-link to="/" class="nav-link">Home</nuxt-link>
    </header>
    <div class="content">
      <section class="hero-image">
        <dither-image
          :src="page.image"
          :alt="page.title"
        ></dither-image>
      </section>
      <section class="content-row">
        <h1>{{ page.title }}.</h1>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useContent, useContentHead, useHead} from "#imports";

const { page } = useContent()
useContentHead(page)
useHead({
  meta: [
    {
      name: 'theme-color',
      content: page.value?.color,
    }
  ]
})
</script>

<style lang="scss" scoped>
@import "assets/css/variables";

.subpage-header {
  display: flex;
  flex-direction: row;

  border-top: 2px solid black;
  border-bottom: 2px solid black;

  .nav-link {
    text-align: center;

    padding: $unit 2 * $unit;

    text-transform: uppercase;
    color: black;
    text-decoration: none;
    font-weight: 500;
    letter-spacing: .5px;

    transition: background .2s;

    &:hover {
      background: $grey-light;
    }

    border-right: 2px solid black;
  }
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-image {
  width: 100%;

  @media (min-width: $breakpoint-tablet) {
    width: $breakpoint-tablet;
  }
}

.content-row {
  padding: 2 * $unit;
  width: 100%;

  @media (min-width: $breakpoint-tablet) {
    width: $breakpoint-tablet;
  }
}
</style>
