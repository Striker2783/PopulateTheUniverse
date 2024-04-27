<script setup lang="ts">
import { game } from 'game/game';
import { ref } from 'vue';

const rate = ref(game.human_rate)
requestAnimationFrame(() => {
    rate.value = game.human_rate
})
</script>

<template>
    <h1>Humans: {{ game.humans.humans.v.value.toFixed(2) }} / {{ game.humans.max.v.value.floor() }}</h1>
    <p>Rate: {{ game.human_rate.toFixed(2) }}/s</p>
</template>
