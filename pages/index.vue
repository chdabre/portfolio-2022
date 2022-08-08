<template>
  <div class="container">
    <div class="container col-6 col-md-6 col-4">
      <div ref="scrollSrc" class="col col-6 col-md-3 col-lg-2">
        <!-- LEFT COL -->
        <header class="introduction">
          <h1>Dario Breitenstein</h1>
          <h3>I am a designer, engineer and artist building bridges between the digital and physical world.</h3>
          <h3>
            Zürich
            <br>
            <a href="mailto:contact@imakethings.ch">contact@imakethings.ch</a>
          </h3>
        </header>

        <section class="social-links">
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
          <a href="#">GitHub</a>
        </section>

        <thing-list-tile/>
      </div>
      <div ref="scrollTarget" class="col col-6 col-md-3 col-lg-2 col-reverse">
        <!-- MIDDLE COL -->
        <thing-list-tile/>
      </div>
    </div>
    <div class="col col-6 col-lg-2 contain-scroll">
      <!-- RIGHT COL -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "#imports";
import ThingListTile from "~/pages/ThingListTile.vue";

const BREAKPOINT_MOBILE = 768;

const scrollSrc = ref<HTMLElement>();
const scrollTarget = ref<HTMLElement>();

const endTrigger = ref<number>(0);
const transformAmount = ref<number>(0);

function setupAnimation() {
  endTrigger.value = scrollSrc.value.clientHeight - window.innerHeight;
  transformAmount.value = scrollTarget.value.clientHeight - window.innerHeight;
}

function animate() {
  if (window.innerWidth <= BREAKPOINT_MOBILE) {
    scrollTarget.value.style.transform = `translateY(0)`;
    return;
  }
  const scrollY = window.scrollY;

  if (scrollY <= endTrigger.value) {
    const animProgress = scrollY / endTrigger.value;
    scrollTarget.value.style.transform = `translateY(calc(-100% + 100vh + ${window.scrollY}px + ${transformAmount.value * animProgress}px))`;
  }
}

onMounted(() => {
  window.addEventListener('scroll', animate);
  window.addEventListener('resize', setupAnimation);
  setupAnimation();
})
</script>
