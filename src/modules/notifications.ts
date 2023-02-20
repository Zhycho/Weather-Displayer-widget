import { notification } from 'ant-design-vue';

function canNotFindLocation(name: string) {
    notification.open({
        message: "Can't find",
        description: `Can't find the location ${name}. Try to type it correct or try to add another.`
    });
}

function locationAlreadyAddedToList(name: string) {
    notification.open({
        message: 'Already added',
        description: `The location ${name} already added to list`
    });
}

export { canNotFindLocation, locationAlreadyAddedToList };
