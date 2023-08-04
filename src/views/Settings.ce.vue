<template>
    <div class="settings">
        <my-header title="Settings" icon="XMark" @changePage="changePage('Main')" />
        <div class="cities-list">
            <draggable :list="cities" @change="val => val">
                <div v-for="city in cities" :key="city.id" class="cities-list__item">
                    <div class="cities-list__item-bar">
                        <icon name="Bars" width="20px" height="20px" style="cursor: pointer" />
                        <p>{{ city.name }}</p>
                    </div>
                    <icon @click="deleteCity(city.id)" name="Trash" width="20px" height="20px"
                          style="cursor: pointer" />
                </div>
            </draggable>
        </div>
        <!--    The reason why I haven't used two way binding method is that it doesn't work properly with Vue 3    -->
        <city-input
            :city-name="cityName"
            @changeCityName="val => changeCityName(val)"
            @checkCityName="checkCityName"
        />
    </div>
</template>

<script lang="ts">
import {useStore} from "../store";
import {defineComponent} from 'vue';
import Icon from '../components/Icon.ce.vue'
import {storeToRefs} from "pinia";
import {VueDraggableNext} from 'vue-draggable-next'
import CityInput from '../components/CityInput.ce.vue'
import Header from '../components/Header.ce.vue'

export default defineComponent({
    name: 'Settings',
    components: {
        Icon,
        draggable: VueDraggableNext,
        CityInput,
        myHeader: Header
    },
    data() {
        return {
            cityName: ''
        }
    },
    methods: {
        async checkCityName() {
            if (this.cityName) {
                await this.loadCity(this.cityName)
                this.cityName = ''
            } else {
                this.flashMessage('error', 'City name field is empty!')
            }
        },
        changeCityName(val: string) {
            this.cityName = val
        }
    },
    setup() {
        const store = useStore()

        const {getCities} = storeToRefs(store)

        return {
            //  Actions
            changePage: store.changePage,
            loadCity: store.loadCity,
            deleteCity: store.deleteCity,
            flashMessage: store.flashMessage,
            //  Getters
            cities: getCities
        }
    }
});
</script>
