<script setup lang="ts">
import game from "game/game";
import { type ResourceNames } from "game/data/resources";
const props = defineProps({
  resource: {
    type: String,
    req: true,
  },
});
const resource_name = props.resource! as ResourceNames;
</script>

<template>
  <h1>
    {{ resource!.charAt(0).toUpperCase() + resource!.slice(1) }}:
    {{ game.resources.get(resource_name)!.ref.value.floor() }}
  </h1>
  <div>
    Rate
    {{ game.resources.get(resource_name)!.rate.ref.value.toFixed(2) }}/s
  </div>
  <div>
    Assigned:
    {{ game.resources.get(resource_name)!.assigned_humans.ref.value.floor() }}
  </div>
  <div>
    <button @click="game.add_humans(resource_name)">Assign</button>
    <button @click="game.add_humans(resource_name, -1)">Unassign</button>
  </div>
</template>
