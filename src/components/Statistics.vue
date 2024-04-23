<script setup lang="ts">
import game from "@/game/game";
import { Listener } from "@/utils/listeners";
import { onBeforeUnmount } from "vue";
</script>

<template>
  <h1>Total Food {{ game.resources.get("food")!.total.value }}</h1>
  <h1>Total Humans {{ game.resources.get("human")!.total.value }}</h1>
  <h1>Total Wood {{ game.resources.get("wood")!.total.value }}</h1>
  <h1>Total Stone {{ game.resources.get("stone")!.total.value }}</h1>
</template>
