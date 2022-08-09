<template>
  <div
      ref="container"
      class="tooltip-container"
      @click="onClick"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      @mousemove="onMouseMove"
      @touchend="showTooltip = false"
  >
    <ClientOnly>
      <teleport to="#__nuxt">
        <div
            ref="tooltip"
            class="tooltip"
            :class="{ active: showTooltip }"
            :style="tooltipStyle"
        >Read<br>Story</div>
      </teleport>
    </ClientOnly>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, toRefs} from "#imports";
import {deferredComputed} from "@vue/reactivity";
import {useRouter} from "#app";

const props = defineProps<{
  color?: string,
  href?: string,
}>();

const { color, href } = toRefs(props);

const router = useRouter();

const container = ref();
const tooltip = ref();

const showTooltip = ref<boolean>(false);
const xPos = ref<number>(0);
const yPos = ref<number>(0);

const tooltipStyle = deferredComputed(() => {
  return {
    left: `${xPos.value}px`,
    top: `${yPos.value}px`,
    background: color.value ? color.value : '#000',
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

function onMouseMove(e) {
  xPos.value = e.clientX;
  yPos.value = e.clientY;
}

function onClick() {
  if (href.value) {
    router.push(href.value);
  }
}
</script>

<style lang="scss" scoped>
.tooltip-container {
  cursor: none;
}

.tooltip {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  left: 0;
  transform: translateX(-50%) translateY(-50%) scale(0);

  width: 80px;
  height: 80px;
  line-height: 16px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  background: #000;

  z-index: 5;
  pointer-events: none;

  transition: transform 0.25s;
  opacity: 0;

  border: 2px solid black;

  &.active {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) scale(1.1);
  }
}
</style>
