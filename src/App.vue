<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import game from "./game/game";
import Decimal from "break_eternity.js";
import { Listener } from "./utils/listeners";

let food = Listener.new_decimal(game.resources.get("food")!);
let food_rate = Listener.new_decimal(game.resources.get("food")!.rate);
let wood = Listener.new_decimal(game.resources.get("wood")!);
let wood_rate = Listener.new_decimal(game.resources.get("wood")!.rate);
let stone = Listener.new_decimal(game.resources.get("stone")!);
let stone_rate = Listener.new_decimal(game.resources.get("stone")!.rate);
let humans = Listener.new_decimal(game.humans);
let human_rate = Listener.new_decimal(game.humans.rate);

onBeforeUnmount(() => {
  food.disconnect();
  food_rate.disconnect();
  humans.disconnect();
  human_rate.disconnect();
  wood.disconnect();
  wood_rate.disconnect();
  stone.disconnect();
  stone_rate.disconnect();
});
</script>

<template>
  <h1>Food: {{ food.value }}</h1>
  <div>Rate {{ food_rate.value.toFixed(2) }}/s</div>
  <button @click="game.increment('food')">Increment</button>
  <h1>Humans: {{ humans.value }}</h1>
  <div>Rate {{ human_rate.value.toFixed(2) }}/s</div>
  <button @click="game.increment_humans()">Increment</button>
  <h1>Wood: {{ wood.value }}</h1>
  <div>Rate {{ wood_rate.value.toFixed(2) }}/s</div>
  <button @click="game.increment('wood')">Increment</button>
  <h1>Stone: {{ stone.value }}</h1>
  <div>Rate {{ stone_rate.value.toFixed(2) }}/s</div>
  <button @click="game.increment('stone')">Increment</button>
</template>
