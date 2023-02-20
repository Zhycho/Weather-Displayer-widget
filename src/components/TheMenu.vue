<script setup lang="ts">
import { ref } from 'vue';

import { Button as AButton } from 'ant-design-vue';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons-vue';

import LocationAdder from '@/components/LocationAdder.vue';
import LocationsManager from '@/components/LocationsManager.vue';

const isMenuOpened = ref(false);

function toggleIsMenuOpened() {
    isMenuOpened.value = !isMenuOpened.value;
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

<style lang="scss" scoped>
.menu {
    background: #f0f2f5;
    height: calc(100% - 4rem);
    left: 0;
    opacity: 0;
    padding: 1.5rem;
    position: absolute;
    top: 4rem;
    transition: visibility 0s linear .3s, opacity .3s;
    visibility: hidden;
    width: 100%;
    z-index: -1;

    &__row {

        &:not(:last-of-type) {
            margin-bottom: 1rem;
        }
    }

    &.is-open {
        opacity: 1;
        transition: visibility 0s linear 0s, opacity .3s;
        visibility: visible;
        z-index: 1;
    }
}
</style>
