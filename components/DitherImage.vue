<template>
  <div class="dither-image">
    <canvas ref="canvas"></canvas>
    <nuxt-picture
      ref="picture"
      :src="src"
      :alt="alt"
      :imgAttrs="{crossorigin: 'anonymous'}"
      :width="getImageSize()"
      :height="getImageSize()"
      preload
      loading="lazy"
      provider="cloudinary"
      fit="fill"
    >
    </nuxt-picture>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "#imports";

defineProps<{
  src: string,
  alt: string,
}>();

const picture = ref();
const image = ref<HTMLImageElement>();
const canvas = ref<HTMLCanvasElement>();

function getImageSize() {
  if (typeof window !== 'undefined') {
    return window.innerWidth > 720 ? 720 : 360;
  } else {
    return 360;
  }
}

function imageLoaded() {
  const canvasEl = canvas.value;
  if (canvasEl) {
    const imageEl = image.value;
    const ctx = canvasEl.getContext("2d");

    const index = (r, c) => (r * canvasEl.width + c) << 2;

    const dither = (pixels, r, c, k) => {
      const i = index(r, c) + k;
      const v = pixels[i];
      const vn = 255 - v < 255 >> 1 ? 255 : 0;
      const rem = v - vn;
      pixels[i] = vn;
      if (c < canvasEl.width - 1) pixels[index(r, c + 1) + k] += (rem >> 4) * 7;
      if (r < canvasEl.height - 1 && c < canvasEl.width - 1)
        pixels[index(r + 1, c + 1) + k] += rem >> 4;
      if (r < canvasEl.height - 1) pixels[index(r + 1, c) + k] += (rem >> 4) * 5;
      if (r < canvasEl.height - 1 && c > 0)
        pixels[index(r + 1, c - 1) + k] += (rem >> 4) * 3;
    };

    canvasEl.width = imageEl.width;
    canvasEl.height = imageEl.height;

    ctx.drawImage(imageEl, 0, 0, canvasEl.width, canvasEl.height);
    const data = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
    for (let r = 0; r < canvasEl.height; ++r)
      for (let c = 0; c < canvasEl.width; ++c) {
        dither(data.data, r, c, 0); // red
        dither(data.data, r, c, 1); // green
        dither(data.data, r, c, 2); // blue
      }

    ctx.putImageData(data, 0, 0);
    imageEl.style.opacity = '0';
  }
}

onMounted(() => {
  const imgEl = picture.value.$el.querySelector('img')
  image.value = imgEl;
  console.log(imgEl.width, imgEl.height);
  imgEl.addEventListener('load', imageLoaded);
  if (image.value?.complete) imageLoaded();
})
</script>

<style scoped lang="scss">
.dither-image {
  position: relative;
  padding-bottom: 100%;
  overflow: hidden;

  :deep(img), canvas {
    position: absolute;
    width: auto;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 1;
  }

  :deep(img) {
    // filter: grayscale(100%);
    transform-origin: center;
    transition: opacity .2s;
  }

  canvas {
    z-index: -1;
  }
}
</style>
