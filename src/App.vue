<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import game from './game/game';
import Decimal from 'break_eternity.js';

let food = ref(new Decimal(0));

let food_func = game.food_observer.addListener((v) =>{
    food.value = v;
})

onBeforeUnmount(() => {
    game.food_observer.removeListener(food_func);
})

</script>

<template>
    <h1>Food: {{ food }}</h1>
    <button @click="game.increment()">
        Increment
    </button>
</template>
