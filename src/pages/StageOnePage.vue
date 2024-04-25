<script setup lang="ts">
import game from "game/game";
</script>

<template>
  <h1>Food: {{ game.resources.get("food")!.ref.value.floor() }}</h1>
  <div>Rate {{ game.resources.get("food")!.rate.ref.value.toFixed(2) }}/s</div>
  <div>
    Assigned:
    {{ game.resources.get("food")!.assigned_humans.ref.value.floor() }}
  </div>
  <div>
    <button @click="game.add_humans('food')">Assign</button>
    <button @click="game.add_humans('food', -1)">Unassign</button>
  </div>
  <h1>
    Humans: {{ game.humans.current.ref.value.floor() }} /
    {{ game.humans.max_humans.ref.value.floor() }}
  </h1>
  <div>Rate {{ game.humans.current.rate.ref.value.toFixed(2) }}/s</div>
  <h1>Wood: {{ game.resources.get("wood")!.ref.value.floor() }}</h1>
  <div>Rate {{ game.resources.get("wood")!.rate.ref.value.toFixed(2) }}/s</div>
  <h1>Stone: {{ game.resources.get("stone")!.ref.value.floor() }}</h1>
  <div>Rate {{ game.resources.get("stone")!.rate.ref.value.toFixed(2) }}/s</div>
</template>
