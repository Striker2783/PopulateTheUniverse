<script setup lang="ts">
import game from "game/game";
</script>

<template>
  <h1>Food: {{ game.resources.get("food")!.ref.value.floor() }}</h1>
  <div>Rate {{ game.resources.get("food")!.rate.ref.value.toFixed(2) }}/s</div>
  <button @click="game.start_increment('food')">Increment</button>
  <h1>Humans: {{ game.resources.get("human")!.ref.value.floor() }}</h1>
  <div>Rate {{ game.resources.get("human")!.rate.ref.value.toFixed(2) }}/s</div>
  <button @click="game.start_increment('human')">Increment</button>
  <h1>Wood: {{ game.resources.get("wood")!.ref.value.floor() }}</h1>
  <div>Rate {{ game.resources.get("wood")!.rate.ref.value.toFixed(2) }}/s</div>
  <button @click="game.start_increment('wood')">Increment</button>
  <h1>Stone: {{ game.resources.get("stone")!.ref.value.floor() }}</h1>
  <div>Rate {{ game.resources.get("stone")!.rate.ref.value.toFixed(2) }}/s</div>
  <button @click="game.start_increment('stone')">Increment</button>
</template>
