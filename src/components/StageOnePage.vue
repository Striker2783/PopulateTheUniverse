<script setup lang="ts">
import game from "@/game/game";
</script>

<template>
  <h1>Food: {{ game.resources.get("food")!.value }}</h1>
  <div>Rate {{ game.resources.get("food")!.rate.value.toFixed(2) }}/s</div>
  <button @click="game.start_increment('food')">Increment</button>
  <h1>Humans: {{ game.resources.get("human")!.value }}</h1>
  <div>Rate {{ game.resources.get("human")!.rate.value.toFixed(2) }}/s</div>
  <button @click="game.start_increment('human')">Increment</button>
  <h1>Wood: {{ game.resources.get("wood")!.value }}</h1>
  <div>Rate {{ game.resources.get("wood")!.rate.value.toFixed(2) }}/s</div>
  <button @click="game.start_increment('wood')">Increment</button>
  <h1>Stone: {{ game.resources.get("stone")!.value }}</h1>
  <div>Rate {{ game.resources.get("stone")!.rate.value.toFixed(2) }}/s</div>
  <button @click="game.start_increment('stone')">Increment</button>
</template>
