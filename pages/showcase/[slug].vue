<template>
  <div class="page">
    <header class="subpage-header" :style="{ background: page.color, color: fontColor(page.color) }">
      <nuxt-link to="/" class="nav-link">Home</nuxt-link>
    </header>
    <div class="content" v-if="page">
      <section class="content__hero">
        <h1 class="headline">{{ page.description }}</h1>
        <dither-image
          v-if="page.image"
          :src="page.image"
          :alt="page.title"
        ></dither-image>
      </section>

      <div class="content__intro">
        <h2>{{ page.title }}.</h2>


        <table class="facts-table">
          <tbody>
            <tr v-if="page.year"><td class="fact-name">Year</td><td class="fact">{{ page.year }}</td></tr>
            <tr v-if="page.client"><td class="fact-name">Client</td><td class="fact">>{{ page.client }}</td></tr>
            <tr v-if="page.role"><td class="fact-name">Client</td><td class="fact">>{{ page.role }}</td></tr>
            <tr v-if="page.collaborators"><td class="fact-name">Collaborators</td><td class="fact">{{ page.collaborators }}</td></tr>
            <tr v-if="page.awards"><td class="fact-name">Awards</td><td class="fact">{{ page.awards }}</td></tr>
          </tbody>
        </table>
      </div>

      <ContentRenderer class="content__markdown" :value="page" />

      <div id="tech-facts-wrapper"></div>

      <h3 class="text-title">Other Projects</h3>
      <template
          v-for="post in morePosts"
      >
        <thing-list-tile
            v-if="post"
            :key="post._id"
            :title="`${post.title}. ${post.year}`"
            :headline="post.description"
            :color="post.color"
            :gltf-url="post.gltfUrl"
            :image-url="post.image"
            :href="post._path"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fontColor } from "~/utils/color";
import {queryContent, ref, useContent, useContentHead} from "#imports";
import {useHead} from "#head";
import {ParsedContent} from "@nuxt/content/dist/runtime/types";

const { page } = useContent()
useHead({
  meta: [
    {
      name: 'theme-color',
      content: page.value?.color,
    }
  ]
})
useContentHead(page)

const morePosts = ref<ParsedContent[]>();
morePosts.value = (
    await queryContent('/showcase')
        .findSurround(page.value._path,{before: 3, after: 3})
  ).filter(x => !!x).slice(0,3);
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

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  // margin-bottom: 8 * $unit;


  h3 {
    padding-bottom: $unit;
    margin-bottom: $unit;
  }

  :deep(p) {
    font-size: 1.2rem;
    line-height: 2rem;
  }

  &__hero {
    grid-column-start: span 3;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 0;
    width: 100%;

    border-bottom: 2px solid black;

    .headline {
      font-size: 2.5rem;
      padding: 2 * $unit;
      text-transform: unset;
      height: 100%;

      grid-column-start: span 2;
      border-bottom: 2px solid black;

      @media (min-width: $breakpoint-tablet) {
        border-right: 2px solid black;
        grid-column-start: span 1;
        border-bottom: none;
      }
    }

    .dither-image {
      grid-column-start: span 2;

      @media (min-width: $breakpoint-tablet) {
        grid-column-start: span 1;
      }
    }
  }

  &__intro {
    grid-column-start: span 3;

    @media (min-width: $breakpoint-tablet) {
      grid-column-start: span 2;
    }

    h2 {
      font-size: 2rem;
      margin: 2 * $unit 2 * $unit 0 2 * $unit;
    }

    .facts-table {
      padding-bottom: $unit;
      margin: 2 * $unit;
      //border-bottom: 1px solid black;
      font-size: 1.2rem;

      td {
        display: inline-block;
      }

      .fact-name {
        font-weight: 600;
        padding-right: $unit;
        width: 100%;
        @media (min-width: $breakpoint-tablet) {
          width: 150px;
        }
      }
    }
  }

  &__markdown {
    grid-column-start: span 3;
    padding: 0 2 * $unit;

    @media (min-width: $breakpoint-tablet) {
      grid-column-start: span 2;
    }
  }

  #tech-facts-wrapper {
    grid-column-start: span 3;
    padding: 0 2 * $unit;
    margin: 2 * $unit 0;

    @media (min-width: $breakpoint-tablet) {
      margin: 0;
      grid-column-start: span 1;
    }
  }

  .text-title {
    padding: 0 2 * $unit;
    grid-column-start: span 3;
  }

  .thing {
    grid-column-start: span 3;
    @media (min-width: $breakpoint-tablet) {
      grid-column-start: span 1;
    }
    border-top: 2px solid black;

    border-right: 2px solid transparent;
    &:not(:last-child) {
      border-right: 2px solid black;
    }
  }
}



.content-row {

}
</style>
