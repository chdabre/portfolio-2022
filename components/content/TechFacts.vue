<template>
  <client-only v-if="teleport === 'true'">
    <teleport to="#tech-facts-wrapper">
      <div class="tech-facts">
        <h3>Technical Facts</h3>
        <h4 class="front-link">
          <Markdown :use="$slots.link" unwrap="p"/>
        </h4>
        <section>
          <h4>Hardware</h4>
          <Markdown :use="$slots.hardware"/>
        </section>
        <section>
          <h4>Software</h4>
          <Markdown :use="$slots.software"/>
        </section>
      </div>
    </teleport>
  </client-only>
  <div class="tech-facts add-margin" v-else>
    <h3>Technical Facts</h3>
    <h4 class="front-link">
      <Markdown :use="$slots.link" unwrap="p"/>
    </h4>
    <section>
      <h4>Hardware</h4>
      <Markdown :use="$slots.hardware"/>
    </section>
    <section>
      <h4>Software</h4>
      <Markdown :use="$slots.software"/>
    </section>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  teleport?: string,
}>(), {
  teleport: 'true',
});
</script>

<style lang="scss">
@import "assets/css/variables";

$max-width: 320px;

.tech-facts {
  max-width: 100%;
  border: 2px solid black;

  font-family: 'Libre Franklin', 'Franklin Gothic', 'Helvetica', 'Helvetica Neue', sans-serif;

  @media (min-width: $breakpoint-tablet) {
    max-width: 320px;
  }

  h3 {
    font-weight: 900;
    font-size: 24px;
    padding: $unit $unit 0 $unit;
    margin: 0;
    letter-spacing: 1px;
  }

  .front-link {
    margin: 0.5 * $unit $unit;
    a {
      font-size: 18px;
    }
  }

  section {
    margin: 0 $unit;
    padding: 0.5 * $unit 0;

    border-top: 5px solid black;
    font-size: 14px;

    h4 {
      font-size: 20px;
      line-height: 24px;
      border-bottom: 1px dashed black;
      margin-bottom: 0.5 * $unit;
      padding: 0.25 * $unit 0;
    }

    ul {
      list-style: none;
      font-weight: 600;
      padding: 0.25 * $unit 0;
    }

    li {
      padding: 0.25 * $unit 0;
    }

    > ul {
      > li {
        border-bottom: 1px dashed black;
      }

      ul > li {
        font-weight: 400;
      }
    }

  }
}

.add-margin {
  margin: 2 * $unit 0;
}
</style>
