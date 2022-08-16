<template>
  <carousel :breakpoints="breakpoints" :settings="settings">
    <slide v-for='(image, index) in images' :key="index">
      <dither-image
          :src="image"
          alt="Image"
      ></dither-image>
    </slide>
    <template #addons>
      <navigation/>
      <pagination/>
    </template>
  </carousel>
</template>

<script lang="ts" setup>
import {Carousel, Navigation, Pagination, Slide} from 'vue3-carousel';
import DitherImage from "~/components/DitherImage.vue";

defineProps<{
  images: string[],
}>();

const settings = {
  itemsToShow: 3,
}

const breakpoints = {
  0: {
    itemsToShow: 1,
  },
  720: {
    itemsToShow: 3,
  },
}
</script>

<style lang="scss">
@import 'assets/css/variables';
@import 'vue3-carousel/dist/carousel.css';

.carousel {
  margin-top: 2 * $unit;
  margin-bottom: 2 * $unit;

  margin-left: -2 * $unit;

  width: 100vw;

  @media (min-width: $breakpoint-tablet) {
    width: calc(100vw - $unit);
  }

  &__slide {
    border-top: 2px solid black;
    border-bottom: 2px solid black;

    .dither-image {
      width: 100%;

      &:not(:last-child) {
        border-right: 2px solid black;
      }
    }

    img, canvas {
      width: 100%;
      z-index: -1;
    }
  }

  &__prev, &__next, &__pagination {
    @media (min-width: $breakpoint-tablet) {
      display: none;
    }
  }

  &__prev, &__next {
    transform: none;
  }

  &__prev {
    left: $unit;
  }

  &__next {
    right: $unit;
  }

  --vc-clr-primary: black;
  --vc-clr-secondary: grey;
  --vc-clr-white: #ffffff;
  --vc-icn-width: 1.2em;
  --vc-nav-width: 30px;
  --vc-nav-color: #ffffff;
  --vc-nav-background-color: var(--vc-clr-primary);
  --vc-pgn-width: 5px;
  --vc-pgn-height: 5px;
  --vc-pgn-margin: 5px;
  --vc-pgn-border-radius: 0;
  --vc-pgn-background-color: var(--vc-clr-secondary);
  --vc-pgn-active-color: var(--vc-clr-primary);
}
</style>
