<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import game from "./game/game";
import Decimal from "break_eternity.js";
import { Listener } from "./utils/listeners";

let food = new Listener(new Decimal(0), game.food);
let total_food = new Listener(new Decimal(0), game.statistics.total_food);
let humans = new Listener(new Decimal(0), game.humans);

onBeforeUnmount(() => {
  food.disconnect();
  humans.disconnect();
  total_food.disconnect();
});
</script>

<template>
  <h1>Food: {{ food.value }}</h1>
  <button @click="game.increment_food()">Increment</button>
  <h1>Total Food: {{ total_food.value }}</h1>
  <h1>Humans: {{ humans.value }}</h1>
  <button @click="game.increment_humans()">Increment</button>
</template>
