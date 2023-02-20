const LOCAL_STORAGE_KEY = 'weatherDisplayerLocations';

function setDataToLocalStorage(locationNames: string[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locationNames));
}

function getDataFromLocalStorage() : string[] | null {
    const data: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
}

export { setDataToLocalStorage, getDataFromLocalStorage };
