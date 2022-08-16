<template>
  <div class="container" id="container">
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
              v-for="showcasePost in  showcasePostsFirstHalf"
              :key="showcasePost._id"
              :title="`${showcasePost.title}. ${showcasePost.year}`"
              :headline="showcasePost.description"
              :color="showcasePost.color"
              :gltf-url="showcasePost.gltfUrl"
              :image-url="showcasePost.image"
              :href="showcasePost._path"
          />
        </section>
      </div>
      <div ref="scrollTarget" class="col col-6 col-md-3 col-lg-2 col-reverse">
        <!-- MIDDLE COL -->
        <thing-list-tile
            v-for="showcasePost in  showcasePostsSecondHalf"
            :key="showcasePost._id"
            :title="`${showcasePost.title}. ${showcasePost.year}`"
            :headline="showcasePost.description"
            :color="showcasePost.color"
            :gltf-url="showcasePost.gltfUrl"
            :image-url="showcasePost.image"
            :href="showcasePost._path"
        />
      </div>
    </div>
    <div class="col col-6 col-lg-2 contain-scroll">
      <!-- RIGHT COL -->
      <section class="other-things">
        <h3 class="text-title">Other Projects</h3>

        <ThingListItem
            v-for="post in otherPosts"
            :key="post._id"
            :title="`${post.title}. ${post.year}`"
            :subtitle="post.subtitle"
            :headline="post.description"
            :href="post.externalUrl || post._path"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "#imports";
import ThingListTile from "~/components/ThingListTile.vue";
import ThingListItem from "~/components/ThingListItem.vue";
import {ParsedContent} from "@nuxt/content/dist/runtime/types";
import {deferredComputed} from "@vue/reactivity";

const BREAKPOINT_MOBILE = 768;

const scrollSrc = ref<HTMLElement>();
const scrollTarget = ref<HTMLElement>();

const endTrigger = ref<number>(0);
const transformAmount = ref<number>(0);

const showcasePosts = ref<ParsedContent[]>();
const showcasePostsFirstHalf = deferredComputed(() => showcasePosts.value.slice(0, showcasePosts.value.length / 2));
const showcasePostsSecondHalf = deferredComputed(() => showcasePosts.value.slice(showcasePosts.value.length / 2));

const otherPosts = ref<ParsedContent[]>();

function setupAnimation() {
  if (scrollSrc.value && scrollTarget.value) {
    endTrigger.value = scrollSrc.value.clientHeight - window.innerHeight;
    transformAmount.value = scrollTarget.value.clientHeight - window.innerHeight;
  }
}

function animate() {
  if (scrollTarget.value && window.innerWidth <= BREAKPOINT_MOBILE) {
    scrollTarget.value.style.transform = `translateY(0)`;
    return;
  }
  const scrollY = window.scrollY;
  if (scrollTarget.value && scrollY <= endTrigger.value) {
    const animProgress = scrollY / endTrigger.value;
    scrollTarget.value.style.transform = `translateY(calc(-100% + 100vh + ${window.scrollY}px + ${transformAmount.value * animProgress}px))`;
  }
}

showcasePosts.value = await queryContent('/showcase').find()
otherPosts.value = await queryContent('/projects').sort({year: -1}).find()

onMounted(() => {
  window.addEventListener('scroll', animate);
  window.addEventListener('resize', setupAnimation);
  setupAnimation();
  animate();
})
</script>
