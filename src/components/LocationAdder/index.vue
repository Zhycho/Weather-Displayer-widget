<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import store from '@/store';

import { TypographyTitle, Input as AInput, Button as AButton, Alert as AAlert } from 'ant-design-vue';

const props = defineProps({
    title: {
        type: String,
        default: ''
    }
});

const addLocation = (payload : string) => store.dispatch('addLocation', payload);
const clearAlertMessage = () => store.dispatch('clearAlertMessage');

const locationToAdd = ref('');

function submitHandler(e: SubmitEvent) {
    e.preventDefault();
    addLocation(locationToAdd.value);
    locationToAdd.value = '';
}

const alertMessage = computed(() => store.state.alertMessage);

function alertClosedHandler() {
    clearAlertMessage();
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
<a-alert
  v-if="alertMessage.length"
  class="alert"
  type="warning"
  show-icon
  closable
  :message="alertMessage"
  :after-close="alertClosedHandler"
/>
</template>
