<script setup lang="ts">
import { game } from 'game/game';
import { Researchs } from 'game/research';
import { ref } from 'vue';

const ResearchStuff = ref(Researchs)
</script>

<template>
    <h1>Humans: {{ game.humans.v.r.value.toFixed(2) }} / {{ game.humans.m.r.value.toFixed(2) }}</h1>
    <p>Rate: {{ game.human_rate.toFixed(2) }}/s</p>
    <div v-if="game.unlocks.CrudeHouse">
        <h1>Land: {{ game.land.left.toFixed(2) }} / {{ game.land.m.r.value.toFixed(2) }}</h1>
        <h1>Crude Huts: {{ game.crude_homes.v.toFixed(2) }}</h1>
        <button @click="game.build_crude_home(1)">Build</button>
        <button @click="game.build_crude_home(-1)">Destroy</button>
    </div>
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
