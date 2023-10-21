<script setup lang="ts">
const sectionType = 'main' as const
const items = ['test', 'maybe-test', 'definitely-a-test']
</script>

<template>
  <div>
    <header data-test="header-test">
      Header
    </header>
    <section :data-test="`${sectionType}-content`">
      <ul>
        <li
          v-for="item in items"
          :key="item"
          :data-test="item"
          v-text="item"
        />
      </ul>
    </section>
    <footer dataTest="footer-test">
      Footer
    </footer>
  </div>
</template>
