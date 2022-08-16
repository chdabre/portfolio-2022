<template>
  <div class="youtube-embed">
    <iframe
        width="560"
        height="315"
        :src="`https://www.youtube.com/embed/${id}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
defineProps(['id'])
</script>

<style scoped lang="scss">
@import 'assets/css/variables';

.youtube-embed {
  position: relative;
  margin-top: 2 * $unit;
  padding-bottom: 56.25%;
  padding-top: 0;
  height: 0;
  overflow: hidden;

  iframe, object, embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
