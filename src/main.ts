import { defineCustomElement } from 'vue';
import WeatherWidget from '@/WeatherWidget.ce.vue';

customElements.define('weather-widget', defineCustomElement(WeatherWidget));
