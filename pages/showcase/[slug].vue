<template>
  <div class="page">
    <header class="subpage-header" :style="{ background: page.color, color: fontColor(page.color) }">
      <nuxt-link to="/" class="nav-link">Home</nuxt-link>
    </header>
    <div class="content" v-if="page">
      <section class="hero-image">
        <dither-image
          v-if="page.image"
          :src="page.image"
          :alt="page.title"
        ></dither-image>
      </section>
      <section class="content-row">
        <div class="intro">
          <h1>{{ page.title }}.</h1>
          <h3>{{ page.description }}</h3>

          <table class="facts-table">
            <tbody>
              <tr v-if="page.year"><td class="fact-name">Year</td><td class="fact">{{ page.year }}</td></tr>
              <tr v-if="page.client"><td class="fact-name">Client</td><td class="fact">>{{ page.client }}</td></tr>
              <tr v-if="page.role"><td class="fact-name">Client</td><td class="fact">>{{ page.role }}</td></tr>
              <tr v-if="page.collaborators"><td class="fact-name">Collaborators</td><td class="fact">{{ page.collaborators }}</td></tr>
              <tr v-if="page.awards"><td class="fact-name">Awards</td><td class="fact">>{{ page.awards }}</td></tr>
            </tbody>
          </table>
        </div>

        <ContentRenderer :value="page" />
      </section>
      <section style="height: 100px;"></section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useContent, useContentHead, useHead} from "#imports";
import { fontColor } from "~/utils/color";

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
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;

  border-top: 2px solid black;
  border-bottom: 2px solid black;

  z-index: 10;

  .nav-link {
    text-align: center;

    padding: $unit 2 * $unit;

    text-transform: uppercase;
    text-decoration: none;
    font-weight: 500;
    letter-spacing: .5px;

    transition: background .2s;
    color: inherit;

    &:hover {
      background: $grey-light;
    }

    border-right: 2px solid black;
  }
}

.content {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-bottom: 0.5 * $unit;
  }

  h3 {
    padding-bottom: $unit;
    margin-bottom: $unit;
  }
}

.hero-image {
  width: 100%;

  @media (min-width: $breakpoint-tablet) {
    width: $breakpoint-tablet;
    height: $breakpoint-tablet;
  }
}

.facts-table {
  width: 100%;
  padding-bottom: $unit;
  margin-bottom: 2 * $unit;
  border-bottom: 1px solid black;

  .fact-name {
    font-weight: 600;
    width: 150px;
  }
}

.content-row {
  padding: 2 * $unit $unit;
  width: 100%;

  @media (min-width: $breakpoint-tablet) {
    padding: 2 * $unit 0;
    width: $breakpoint-tablet;
  }
}
</style>
