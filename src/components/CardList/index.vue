<script setup lang="ts">
import { computed } from 'vue';
import store from '@/store';

import { Space } from 'ant-design-vue';
import WeatherCard from '@/components/WeatherCard/index.vue';

const locations = computed(() => store.state.locations);
</script>

<template>
    <space direction="vertical" class="w-100">
        <weather-card
            v-for="location in locations"
            :geoData="location"
            :key="location.id"
        />
    </space>
</template>
