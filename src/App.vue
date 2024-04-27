<script setup lang="ts">
import { game } from 'game/game';
</script>

<template>
    <h1>Humans: {{ game.humans.humans.r.value.toFixed(2) }} / {{ game.humans.max.r.value.floor() }}</h1>
    <p>Rate: {{ game.human_rate.toFixed(2) }}/s</p>
    <h1>Research: {{ game.research.r.value.toFixed(2) }}</h1>
    <p>Rate: {{ game.research_rate.toFixed(2) }}/s</p>
</template>
