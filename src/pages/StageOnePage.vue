<script setup lang="ts">
import Resources from "@/components/Resources.vue";
import game from "game/game";
</script>

<template>
  <Resources resource="food"></Resources>
  <h1>
    Humans: {{ game.humans.current.ref.value.floor() }} /
    {{ game.humans.max_humans.ref.value.floor() }}
  </h1>
  <div>Rate {{ game.humans.current.rate.ref.value.toFixed(2) }}/s</div>
  <Resources resource="wood"></Resources>
  <Resources resource="stone"></Resources>
</template>
