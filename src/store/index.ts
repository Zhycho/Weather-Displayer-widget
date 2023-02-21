import { createStore } from 'vuex';
import { getLocationWeather } from '@/api/openWeather';
import { canNotFindLocation, locationAlreadyAddedToList } from '@/modules/notifications';
import { Location, LocationsToSort } from '@/models/interfaces';

const store = createStore({
    state: {
        locations: [] as Location[],
        alertMessage: '' as string,
        isFetching: false
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
        },
        SET_ALERT_MESSAGE(state, payload : string) {
            state.alertMessage = payload;
        },
        SET_IS_FETCHING(state, payload: boolean) {
            state.isFetching = payload;
        }
    },
    actions: {
        /**
         * Добавление локации
         */
        async addLocation({ commit, getters }, payload : string) {
            commit('SET_IS_FETCHING', true);

            if (getters.getLocationByName(payload)) { // если локация уже есть в списке - не добавляем
                locationAlreadyAddedToList(payload);
                commit('SET_IS_FETCHING', false);
                return;
            }

            try {
                const location : Location | undefined = await getLocationWeather(payload);
                if (location) commit('ADD_LOCATION', location);
            } catch (error) {
                console.error(error);
                canNotFindLocation(payload);
            } finally {
                commit('SET_IS_FETCHING', false);
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
        },
        /**
         * Установить текст для предупреждения
         */
        setAlertMessage({ commit }, payload: string) {
            commit('SET_ALERT_MESSAGE', payload);
        },
        /**
         * Очистить текст для предупреждения
         */
        clearAlertMessage({ commit }) {
            commit('SET_ALERT_MESSAGE', '');
        }
    }
});

export default store;
