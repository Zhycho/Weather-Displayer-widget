<script setup lang="ts">
import { defineProps, computed } from 'vue';
import store from '@/store';
import { TypographyTitle, Layout, LayoutHeader, LayoutContent, Spin } from 'ant-design-vue';

import TheMenu from '@/components/TheMenu/index.vue';
import LocationAdder from '@/components/LocationAdder/index.vue';
import CardList from '@/components/CardList/index.vue';

const isShowSpinner = computed(() => store.state.isFetching);

const props = defineProps({
    isInitialOpening: {
        type: Boolean,
        required: true
    }
});
</script>

<template>
    <layout class="container" style="min-height: 350px;">
        <layout-header class="header">
            <div class="header__title-wrap">
                <typography-title class="header__title" :level="4">Weather Displayer</typography-title>
                <spin v-if="isShowSpinner" class="header__spinner"/>
            </div>
            <the-menu class="header__menu" v-if="!props.isInitialOpening"/>
        </layout-header>
        <layout>
            <layout-content class="content">
                <location-adder v-if="props.isInitialOpening" title="Set your location: "/>
                <card-list v-else/>
            </layout-content>
        </layout>
    </layout>
</template>
