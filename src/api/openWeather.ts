import store from '@/store';
import { Location, LocationInitialData } from '@/models/interfaces';
import { locationAlreadyAddedToList } from '@/modules/notifications';

const API_KEY = '983397215a2cd7b73b83759952f664a9';
const BASE_API = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_IMG_URL = 'http://openweathermap.org/img';
const UNITS_OF_MEASUREMENT = 'metric';

async function getResource(url: string) {
    const finalURL = `${BASE_API}${url}&appid=${API_KEY}`;
    const res = await fetch(finalURL);

    if (!res.ok) {
        throw new Error(`Could not fetch ${finalURL}, received ${res.status}`);
    }

    const body = await res.json();
    return body;
}

async function getLocationWeather(locationName: string) {
    const locationWeatherData = await getResource(`?q=${locationName}&units=${UNITS_OF_MEASUREMENT}`);

    // повторная проверка, т. к. имена автоматически преобразуются API (например st petersburg = Saint petersburg)
    if (store.getters.getLocationByName(locationWeatherData.name)) {
        locationAlreadyAddedToList(locationWeatherData.name);
        return;
    }

    return transformLocationWeather(locationWeatherData);
}

function transformLocationWeather({ id, visibility, name, weather, main, wind }: LocationInitialData) : Location {
    return {
        id,
        name,
        description: weather[0].description,
        icon: weather[0].icon,
        temp: Math.round(main.temp),
        feelsLike: Math.round(main.feels_like),
        humidity: main.humidity,
        visibility,
        windSpeed: wind.speed
    };
}

function getWeatherImage(iconPath: string) {
    return `${WEATHER_IMG_URL}/wn/${iconPath}.png`;
}

export { getLocationWeather, getWeatherImage };
