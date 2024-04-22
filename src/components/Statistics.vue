<script setup lang="ts">
import game from "@/game/game";
import { Listener } from "@/utils/listeners";
import { onBeforeUnmount } from "vue";

let total_food = Listener.new_decimal(game.resources.get("food")!.total);
let total_human = Listener.new_decimal(game.resources.get("human")!.total);
let total_wood = Listener.new_decimal(game.resources.get("wood")!.total);
let total_stone = Listener.new_decimal(game.resources.get("stone")!.total);

onBeforeUnmount(() => {
  total_food.disconnect();
  total_human.disconnect();
  total_wood.disconnect();
  total_stone.disconnect();
});
</script>

<template>
  <h1>Total Food {{ total_food.value }}</h1>
  <h1>Total Humans {{ total_human.value }}</h1>
  <h1>Total Wood {{ total_wood.value }}</h1>
  <h1>Total Stone {{ total_stone.value }}</h1>
</template>
