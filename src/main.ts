import {defineCustomElement} from 'vue';
import {createPinia, setActivePinia} from "pinia";
import App from './App.ce.vue';

setActivePinia(createPinia());

const widget = defineCustomElement(App)

customElements.define('weather-widget', widget)