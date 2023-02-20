<script setup lang="ts">
import { defineProps } from 'vue';
import { TypographyTitle, Layout, LayoutHeader, LayoutContent } from 'ant-design-vue';
import TheMenu from '@/components/TheMenu.vue';
import LocationAdder from '@/components/LocationAdder.vue';
import CardList from '@/components/CardList.vue';

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
            <typography-title class="header__title" :level="4">Weather Displayer</typography-title>
            <the-menu v-if="!props.isInitialOpening"/>
        </layout-header>
        <layout>
            <layout-content class="content">
                <location-adder v-if="props.isInitialOpening" title="Set your first location: "/>
                <card-list v-else/>
            </layout-content>
        </layout>
    </layout>
</template>

<style lang="scss" scoped>
.container {
    margin: 0 auto;
    max-height: 100vh;
    max-width: 400px;
    position: relative;
}
.header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;

    &__title {
        color: white;
        margin: 0;
    }
}

.content {
    overflow-y: auto;
    padding: 16px 24px;
}
</style>
