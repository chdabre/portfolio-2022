<template>
  <article class="thing">
    <figure>
      <tooltip
          :color="color"
          :href="href"
      >
        <display-case
            v-if="gltfUrl"
            :url="gltfUrl"
        ></display-case>
        <dither-image
            v-if="imageUrl"
            :src="imageUrl"
            :alt="headline"
        ></dither-image>
      </tooltip>
      <nuxt-link :to="href" :style="captionStyle">
        <h2 v-text="title"></h2>
        <h3 v-text="headline"></h3>
      </nuxt-link>
    </figure>
  </article>
</template>

<script lang="ts" setup>
import DisplayCase from "~/components/three-display-case/DisplayCase.vue";
import DitherImage from "~/components/DitherImage.vue";
import Tooltip from "~/components/Tooltip.vue";
import {toRefs} from "#imports";
import {deferredComputed} from "@vue/reactivity";

const props = defineProps<{
  title: string,
  headline: string,
  href: string,
  imageUrl?: string,
  gltfUrl?: string,
  color: string,
}>();

const { color } = toRefs(props);
const captionStyle = deferredComputed(() => {
  return {
    backgroundColor: color.value,
    color: fontColor(color.value),
  };
});

function fontColor(color: string) {
  if (color) {
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 150 ? "#000" : "#fff";
  }
  return '#000';
}
</script>

<style lang="scss" scoped>
@import "assets/css/variables";

.thing {
  border-bottom: 2px solid black;

  a {
    display: block;
    padding: $unit;

    background-color: $grey-light;

    color: inherit;
    text-decoration: none;

    h2 {
      text-decoration: underline;
    }

    h3 {
      padding: $unit 0;
    }

    &:visited {
      color: inherit;
    }
  }
}
</style>
