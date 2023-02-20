<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

import { getDataFromLocalStorage, setDataToLocalStorage } from '@/modules/localStorage';

import TheLayout from '@/components/TheLayout.vue';

const isInitialOpening = ref(true);

const store = useStore();
const locationsNamesList = computed(() => store.getters.locationsNamesList);
const addLocation = (payload : string) => store.dispatch('addLocation', payload);

watch(locationsNamesList, () => {
    isInitialOpening.value = false;
    setDataToLocalStorage(locationsNamesList.value);
});

onMounted(() => {
    const data : string[] | null = getDataFromLocalStorage();
    if (data && data.length) {
        isInitialOpening.value = false;
        data.forEach((location : string) => {
            addLocation(location);
        });
    } else {
        isInitialOpening.value = true;
    }
});

</script>

<template>
    <TheLayout :isInitialOpening="isInitialOpening"/>
</template>
