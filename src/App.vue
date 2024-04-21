<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import game from "./game/game";
import Decimal from "break_eternity.js";

let food = ref(new Decimal(0));
let total_food = ref(Decimal.dZero);
let humans = ref(new Decimal(0));

let food_func = game.food.addListener((v) => {
  food.value = v;
});

let human_func = game.humans.addListener((v) => {
  humans.value = v;
});

let total_food_func = game.statistics.total_food.addListener((v) => {
  total_food.value = v;
});

onBeforeUnmount(() => {
  food_func();
  human_func();
  total_food_func();
});
</script>

<template>
  <h1>Food: {{ food }}</h1>
  <button @click="game.increment_food()">Increment</button>
  <h1>Total Food: {{ total_food }}</h1>
  <h1>Humans: {{ humans }}</h1>
  <button @click="game.increment_humans()">Increment</button>
</template>
