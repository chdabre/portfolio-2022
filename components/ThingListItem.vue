<template>
  <nuxt-link :to="href" :target="href.includes('http') ? '_blank' : '_self'" class="thing-list-item">
    <h3 v-text="title"></h3>
    <h4 v-text="subtitle"></h4>
    <p v-text="headline"></p>
  </nuxt-link>
</template>

<script lang="ts" setup>
defineProps<{
  title: string,
  subtitle: string,
  headline: string,
  href: string,
}>();
</script>

<style lang="scss">
@import "../assets/css/variables";

.thing-list-item {
  color: $text-on-surface;
  text-decoration: none;
  display: block;

  padding: $unit 2 * $unit;
  transition: background .5s;

  &:hover {
    background-color: $grey-light;
  }

  h3 {
    text-decoration: underline;
  }

  h4 {
    padding-bottom: .5 * $unit;
  }
}
</style>
