<script setup lang="ts">
import { ref, computed } from 'vue';
import store from '@/store';

import { LocationsToSort } from '@/models/interfaces';

import { TypographyTitle, List, ListItem, Button as AButton } from 'ant-design-vue';
import { MoreOutlined, DeleteFilled } from '@ant-design/icons-vue';

const targetForDropIndex = ref<number | null>(null);
const locationsNamesList = computed(() => store.getters.locationsNamesList);

const removeLocation = (payload : string) => store.dispatch('removeLocation', payload);
const setLocationPosition = (payload : LocationsToSort) => store.dispatch('setLocationPosition', payload);

function onDragStart(e : DragEvent, index : number) {
    if (e.dataTransfer && e.target) {
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.effectAllowed = 'move';
        const listItem = (e.target as HTMLElement).closest('.list-item') as HTMLLIElement;
        e.dataTransfer.setDragImage(listItem, 0, 0);
        e.dataTransfer.setData('movedLocationIndex', String(index));
    }
}

function onDrop({ dataTransfer } : DragEvent, targetLocationIndex : number) {
    if (!dataTransfer) return;

    const movedLocationIndex = +dataTransfer.getData('movedLocationIndex');
    if (movedLocationIndex === targetLocationIndex) {
        return;
    }
    setLocationPosition({
        movedLocationIndex,
        targetLocationIndex
    });
    targetForDropIndex.value = null;
}

function onDragEnter(e : DragEvent, index : number) {
    e.preventDefault();
    targetForDropIndex.value = index;
}

function onDragEnd() {
    targetForDropIndex.value = null;
}
</script>

<template>
    <template v-if="locationsNamesList && locationsNamesList.length">
        <typography-title :level="5">Current Locations: </typography-title>
        <list class="list" size="small" bordered :data-source="locationsNamesList">
            <template #renderItem="{ item, index }">
                <list-item
                    class="list-item"
                    :class="{ 'is-target-for-drop': targetForDropIndex === index }"
                    :key="item.id"
                    @dragover.prevent
                    @dragenter="onDragEnter($event, index)"
                    @drop="onDrop($event, index)"
                >
                    <a-button
                        class="button-drag"
                        draggable="true"
                        @dragstart="onDragStart($event, index)"
                        @dragend="onDragEnd"
                    >
                        <template #icon>
                            <more-outlined />
                        </template>
                    </a-button>
                    <span class="list-item__title">{{ item }}</span>
                    <a-button class="button-delete" type="primary" danger @click="removeLocation(item)">
                        <template #icon>
                            <delete-filled />
                        </template>
                    </a-button>
                </list-item>
            </template>
        </list>
    </template>
</template>
