<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import store from '@/store';

import { getDataFromLocalStorage, setDataToLocalStorage } from '@/modules/localStorage';

import TheLayout from '@/components/TheLayout/index.vue';

const isInitialOpening = ref(true);

const locationsNamesList = computed(() => store.getters.locationsNamesList);
const addLocation = async(payload : string) => store.dispatch('addLocation', payload);

watch(locationsNamesList, () => {
    isInitialOpening.value = false;
    setDataToLocalStorage(locationsNamesList.value);
});

onMounted(async() => {
    const data : string[] | null = getDataFromLocalStorage();

    if (data && data.length) {
        isInitialOpening.value = false;
        for (const location of data) {
            await addLocation(location);
        }
    } else {
        isInitialOpening.value = true;
    }
});

</script>

<template>
    <TheLayout :isInitialOpening="isInitialOpening"/>
</template>

<style lang="scss">
@import 'ant-design-vue/dist/antd';

@import '@/components/CardList/style.scss';
@import '@/components/LocationAdder/style.scss';
@import '@/components/LocationsManager/style.scss';
@import '@/components/TheLayout/style.scss';
@import '@/components/TheMenu/style.scss';
@import '@/components/WeatherCard/style.scss';
</style>
