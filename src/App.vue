<script setup lang="ts">
import { ref } from "vue";
import StageOnePage from "./components/StageOnePage.vue";
import Statistics from "./components/Statistics.vue";

enum Pages {
  Main,
  Stats,
}

function changePage() {
  switch (page.value) {
    case Pages.Main:
      page.value = Pages.Stats;
      break;
    case Pages.Stats:
      page.value = Pages.Main;
      break;
  }
}

let page = ref(Pages.Main);
</script>

<template>
  <StageOnePage v-if="page == Pages.Main"></StageOnePage>
  <Statistics v-else-if="page == Pages.Stats"></Statistics>
  <div>
    <button @click="changePage()">Change Page</button>
  </div>
</template>
