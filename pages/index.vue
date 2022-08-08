<template>
  <div class="container">
    <div class="container col-6 col-md-6 col-4">
      <div ref="scrollSrc" class="col col-6 col-md-3 col-lg-2">
        <!-- LEFT COL -->
        <header class="introduction">
          <h1>Dario Breitenstein</h1>
          <h3 class="py-1">I am a designer, engineer and artist building bridges between the digital and physical world.</h3>
          <h3>
            Zürich
            <br>
            <a href="mailto:contact@imakethings.ch">contact@imakethings.ch</a>
          </h3>
        </header>

        <section class="social-links">
          <a href="https://www.linkedin.com/in/dario-breitenstein-397873a6/" target="_blank">LinkedIn</a>
<!--          <a href="#">Instagram</a>-->
          <a href="https://github.com/chdabre" target="_blank">GitHub</a>
        </section>

        <section class="showcase">
          <h3 class="text-title">Showcase</h3>
          <thing-list-tile
              title="Photoautomat. 2019"
              headline="An accessible eye-catcher that helps create lasting memories"
              color="#0000FF"
              gltf-url="/models/photobox.glb"
              href="#"
          />
        </section>
      </div>
      <div ref="scrollTarget" class="col col-6 col-md-3 col-lg-2 col-reverse">
        <!-- MIDDLE COL -->
        <thing-list-tile
            title="Museum ENTER. 2022"
            headline="An audiovisual storyteller that grows with the collection"
            color="#FF00FF"
            href="#"
            gltf-url="/models/audioguide.glb"
        />

        <thing-list-tile
            title="The Line. 2020"
            headline="A whimsical, ephemeral messenger that lives in the center of a communal space"
            image-url="https://res.cloudinary.com/dey9hupke/image/upload/w_600,h_400,c_fill/v1589816392/imakethings/hotline.png"
            color="#FFFF00"
            href="#"
        />
      </div>
    </div>
    <div class="col col-6 col-lg-2 contain-scroll">
      <!-- RIGHT COL -->
      <section class="other-things">
        <h3 class="text-title">Other Projects</h3>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "#imports";
import ThingListTile from "~/components/ThingListTile.vue";

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
