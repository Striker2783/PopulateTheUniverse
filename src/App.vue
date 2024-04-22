<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import game from "./game/game";
import Decimal from "break_eternity.js";
import { Listener } from "./utils/listeners";

let food = new Listener(new Decimal(0), game.food);
let food_rate = new Listener(new Decimal(0), game.food.rate);
let total_food = new Listener(new Decimal(0), game.food.total);
let humans = new Listener(new Decimal(0), game.humans);

onBeforeUnmount(() => {
  food.disconnect();
  food_rate.disconnect();
  humans.disconnect();
  total_food.disconnect();
});
</script>

<template>
  <h1>Food: {{ food.value }}</h1>
  <div>Rate {{ food_rate.value.toFixed(2) }}/s</div>
  <button @click="game.increment_food()">Increment</button>
  <h1>Total Food: {{ total_food.value }}</h1>
  <h1>Humans: {{ humans.value }}</h1>
  <button @click="game.increment_humans()">Increment</button>
</template>
