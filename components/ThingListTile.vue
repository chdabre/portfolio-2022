<template>
  <article class="thing">
    <figure>
      <display-case
          v-if="gltfUrl"
      ></display-case>
      <dither-image
          v-if="imageUrl"
          :src="imageUrl"
          :alt="headline"
      ></dither-image>
      <figcaption :style="captionStyle">
        <h2 v-text="title"></h2>
        <h3 v-text="headline"></h3>
        <a :href="href">STORY</a>
      </figcaption>
    </figure>
  </article>
</template>

<script lang="ts" setup>
import DisplayCase from "~/components/three-display-case/DisplayCase.vue";
import DitherImage from "~/components/DitherImage.vue";
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
  figcaption {
    background-color: rgba(0,0,0,0.1);

    padding: $unit;

    h3 {
      padding: $unit 0;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:visited {
        color: inherit;
      }
    }
  }
}
</style>
