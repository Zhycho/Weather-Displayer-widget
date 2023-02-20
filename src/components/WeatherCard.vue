<script setup lang="ts">
import { defineProps, PropType } from 'vue';

import { Location } from '@/models/interfaces';
import { getWeatherImage } from '@/api/openWeather';

import { Card, TypographyText } from 'ant-design-vue';

const props = defineProps({
    geoData: {
        type: Object as PropType<Location>,
        required: true
    }
});

const imagePath = getWeatherImage(props.geoData.icon);
</script>

<template>
    <card :title="geoData.name">
        <div class="card-main">
            <img :src="imagePath" :alt="geoData.description">
            <typography-text strong>{{ geoData.temp }}&#8451;</typography-text>
        </div>
        <div class="card-details">
            <typography-text>Feels like {{ geoData.feelsLike }}&#8451;, {{ geoData.description }}</typography-text>
            <typography-text>Wind speed: {{ geoData.windSpeed }}m/s</typography-text>
            <typography-text>Humidity: {{ geoData.humidity }}&#37;</typography-text>
            <typography-text>Visibility: {{ geoData.visibility }}m</typography-text>
        </div>
    </card>
</template>

<style lang="scss" scoped>
.card-main {
    align-items: center;
    display: flex;
    gap: .75rem;
}

.card-details {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    margin-top: .5rem;
}
</style>
