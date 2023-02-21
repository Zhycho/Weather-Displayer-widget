<script setup lang="ts">
import { ref } from 'vue';
import store from '@/store';

import { Button as AButton } from 'ant-design-vue';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons-vue';

import LocationAdder from '@/components/LocationAdder/index.vue';
import LocationsManager from '@/components/LocationsManager/index.vue';

const isMenuOpened = ref(false);

const clearAlertMessage = () => store.dispatch('clearAlertMessage');

function toggleIsMenuOpened() {
    isMenuOpened.value = !isMenuOpened.value;
    clearAlertMessage();
}
</script>

<template>
<a-button ghost @click="toggleIsMenuOpened">
    <template #icon>
        <close-outlined v-if="isMenuOpened"/>
        <menu-outlined v-else/>
    </template>
</a-button>
<div class="menu" :class="{ 'is-open': isMenuOpened }">
    <div class="menu__row">
        <location-adder title="Add Location: "/>
    </div>
    <div class="menu__row">
        <locations-manager />
    </div>
</div>
</template>
