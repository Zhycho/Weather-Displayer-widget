import store from '@/store';

function canNotFindLocation(name: string) {
    store.dispatch('setAlertMessage', `Can't find the location "${name}". Try to type it correct or try to add another location.`);
}

function locationAlreadyAddedToList(name: string) {
    store.dispatch('setAlertMessage', `The location "${name}" has already been added to the list.`);
}

export { canNotFindLocation, locationAlreadyAddedToList };
