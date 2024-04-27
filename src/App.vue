<script setup lang="ts">
import { game } from 'game/game';
import { Researchs } from 'game/research';
import { ref } from 'vue';

const ResearchStuff = ref(Researchs)
</script>

<template>
    <h1>Humans: {{ game.humans.humans.r.value.toFixed(2) }} / {{ game.humans.max.r.value.floor() }}</h1>
    <p>Rate: {{ game.human_rate.toFixed(2) }}/s</p>
    <h1>Research: {{ game.research_points.r.value.toFixed(2) }}</h1>
    <p>Rate: {{ game.research_rate.toFixed(2) }}/s</p>
    <ul v-for="(upgrade, k) in ResearchStuff">
        <button @click="game.research(k)">
            <p style="font-size: 1.2em;">
                {{ upgrade.name }}
            </p>
            <p>
                {{ upgrade.description }}
            </p>
            <div v-if="game.researched[k]">
                <p>Bought</p>
            </div>
            <div v-else>
                <p>Cost:</p>
                <p>{{ upgrade.cost_display }}</p>
            </div>
        </button>
    </ul>
</template>
