<template>
  <div class="loading-indicator">
    <span>{{ progress ? progressText : '' }}</span>
  </div>
</template>

<script lang="ts" setup>
import {toRefs} from "#imports";
import {deferredComputed} from "@vue/reactivity";

const props = defineProps<{
  progress?: number;
}>();

const {progress} = toRefs(props);

const progressText = deferredComputed(() => {
  if (progress.value < Infinity) {
    return `${Math.round(progress.value * 100)}%`;
  }
  return '';
});
</script>

<style scoped>
.loading-indicator {
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
