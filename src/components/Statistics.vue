<script setup lang="ts">
import game from "@/game/game";
</script>

<template>
  <h1>Total Food {{ game.resources.get("food")!.total.value.floor() }}</h1>
  <h1>Total Humans {{ game.resources.get("human")!.total.value.floor() }}</h1>
  <h1>Total Wood {{ game.resources.get("wood")!.total.value.floor() }}</h1>
  <h1>Total Stone {{ game.resources.get("stone")!.total.value.floor() }}</h1>
</template>
