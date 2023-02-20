import { createStore } from 'vuex';
import { getLocationWeather } from '@/api/openWeather';
import { canNotFindLocation, locationAlreadyAddedToList } from '@/modules/notifications';
import { Location, LocationsToSort } from '@/models/interfaces';

const store = createStore({
    state: {
        locations: [] as Location[]
    },
    getters: {
        locationsNamesList: ({ locations }) : string[] => locations.map(({ name }) => name),
        getLocationByName: ({ locations }) => (nameToFind : string) => {
            return locations.find(({ name }) => name.toLowerCase().trim() === nameToFind.toLowerCase().trim());
        }
    },
    mutations: {
        ADD_LOCATION({ locations }, payload : Location) {
            locations.push(payload);
        },
        REMOVE_LOCATION({ locations }, payload : string) {
            const indexOfRemovedLocation : number = locations.findIndex(({ name }) => name === payload);
            locations.splice(indexOfRemovedLocation, 1);
        },
        SET_LOCATION_POSITION({ locations }, { movedLocationIndex, targetLocationIndex } : LocationsToSort) {
            // меняем местами локации
            [locations[targetLocationIndex], locations[movedLocationIndex]] = [locations[movedLocationIndex], locations[targetLocationIndex]];
        }
    },
    actions: {
        /**
         * Добавление локации
         */
        async addLocation({ commit, getters }, payload : string) {
            if (getters.getLocationByName(payload)) { // если локация уже есть в списке - не добавляем
                locationAlreadyAddedToList(payload);
                return;
            }

            try {
                const location : Location | undefined = await getLocationWeather(payload);
                if (location) commit('ADD_LOCATION', location);
            } catch (error) {
                console.error(error);
                canNotFindLocation(payload);
            }
        },
        /**
         * Удаление локации
         */
        removeLocation({ commit }, payload : string) {
            commit('REMOVE_LOCATION', payload);
        },
        /**
         * Установить новый индекс локации в массиве
         * (Поменять локацию с другой локацией местами в списке)
         */
        setLocationPosition({ commit }, payload : LocationsToSort) {
            commit('SET_LOCATION_POSITION', payload);
        }
    }
});

export default store;
