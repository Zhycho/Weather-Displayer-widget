<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';

import { TypographyTitle, Input as AInput, Button as AButton } from 'ant-design-vue';

const props = defineProps({
    title: {
        type: String,
        default: ''
    }
});

const store = useStore();
const addLocation = (payload : string) => store.dispatch('addLocation', payload);

const locationToAdd = ref('');

function submitHandler(e: SubmitEvent) {
    e.preventDefault();
    addLocation(locationToAdd.value);
    locationToAdd.value = '';
}

</script>

<template>
<typography-title v-if="props.title" :level="5">{{ props.title }}</typography-title>
<form class="form" @submit="submitHandler">
    <a-input
        v-model:value="locationToAdd"
        placeholder="Input name of location to add"
    />
    <a-button type="primary" htmlType="submit">Add</a-button>
</form>
</template>

<style lang="scss" scoped>
.form {
    display: flex;
}
</style>
