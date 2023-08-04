<template>
    <div class="main">
        <template v-if="city && city.weather">
            <my-header :title="`${ city.name }, ${ city.sys?.country }`" :icon="index === 0 && 'Gear'"
                       @changePage="$emit('changePage', 'Settings')" />
            <div class="main__body">
                <img class="main__illustration"
                     :src="`https://openweathermap.org/img/wn/${city.weather && city.weather[0]?.icon}@2x.png`"
                     alt="">
                <h1 class="main__degree">{{ city.main?.temp }}°C</h1>
                <p class="main__description">
                    Feels like {{ city.main?.feels_like }}°C.
                    {{ capitalFirst(city.weather && city.weather[0]?.description) }}.
                </p>
            </div>
            <div class="main__footer">
                <div class="main__info-item">
                    <icon :style="{ transform: `rotate(${city.wind?.deg}deg)` }" name="ArrowPlane"
                          width="10px" />
                    <p>
                        {{ city.wind?.speed }}m/s SSE
                    </p>
                </div>
                <div class="main__info-item">
                    <icon name="Pressure" width="15px" />
                    <p>
                        {{ city.main?.pressure }}Pa
                    </p>
                </div>
                <div class="main__info-item">
                    <icon name="Droplet" width="10px" />
                    <p>
                        Humidity: {{ city.main?.humidity }}%
                    </p>
                </div>
                <div class="main__info-item">
                    <icon name="Eye" width="14px" />
                    <p>
                        Visibility: {{ (city.visibility / 1000).toFixed(1) }}km
                    </p>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import Icon from './Icon.ce.vue'
import Header from '../components/Header.ce.vue'

export default defineComponent({
    name: 'CityItem.ce',
    components: {
        Icon,
        myHeader: Header
    },
    props: {
        city: Object,
        index: Number
    },
    methods: {
        capitalFirst(str: string) {
            return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
        }
    },
});
</script>

<style scoped>

</style>