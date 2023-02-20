<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

import { Space } from 'ant-design-vue';
import WeatherCard from '@/components/WeatherCard.vue';

const store = useStore();
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

<style lang="scss" scoped>
.w-100 {
    width: 100%;
}
</style>
