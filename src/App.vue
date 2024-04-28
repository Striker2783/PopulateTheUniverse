<script setup lang="ts">
import { game } from 'game/game';
import { Researchs } from 'game/research';
import { ref } from 'vue';

const ResearchStuff = ref(Researchs)
</script>

<template>
    <ul class="bar">
        <li class="resource-item">
            <p>Humans: {{ game.humans.v.r.value.toFixed(2) }} / {{ game.humans.m.r.value.toFixed(2) }}</p>
            <p>Rate: {{ game.human_rate.toFixed(2) }}/s</p>
        </li>
        <li class="resource-item">
            <p>Research: {{ game.research_points.r.value.toFixed(2) }}</p>
            <p>Rate: {{ game.research_rate.toFixed(2) }}/s</p>
        </li>
    </ul>
    <ul class="bar">
        <li>
            <p>Land: {{ game.land.left.toFixed(2) }} / {{ game.land.m.r.value.toFixed(2) }}</p>
        </li>
        <li v-if="game.unlocks.CrudeHouse">
            <p>Crude Huts: {{ game.crude_homes.v.toFixed(2) }}</p>
            <button @click="game.build(1, 'crude_homes')">Build</button>
            <button @click="game.build(-1, 'crude_homes')">Destroy</button>
        </li>
        <li v-if="game.unlocks.BasicAgriculture">
            <p>Farm: {{ game.farms.v.toFixed(2) }}</p>
            <button @click="game.build(1, 'farms')">Build</button>
            <button @click="game.build(-1, 'farms')">Destroy</button>
        </li>
    </ul>
    <ul class="upgrades">
        <li v-for="(upgrade, k) in ResearchStuff">
            <button class="upgrade-button" :class="[game.can_afford(Researchs[k]) ? 'upgrade-button-can' : '']"
                @click="game.research(k)" :disabled="game.researched[k]">
                <p class="upgrade-name">
                    {{ upgrade.name }}
                </p>
                <p class="upgrade-description">
                    {{ upgrade.description }}
                </p>
                <div v-if="game.researched[k]">
                    <p>Bought</p>
                </div>
                <div class="upgrade-cost" v-else>
                    <p>Cost:</p>
                    <p>{{ upgrade.cost_display }}</p>
                </div>
            </button>
        </li>
    </ul>
</template>
