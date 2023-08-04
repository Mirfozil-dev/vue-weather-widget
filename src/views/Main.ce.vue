<template>
    <div>
        <template v-if="citiesList.length > 0">
            <city-item v-for="(city, index) in citiesList" :key="city.id"
                       :city="city" :index="index"
                       @changePage="changePage('Settings')"
            />
        </template>
        <template v-else>
            <my-header title="No selected cities..." icon="Gear" @changePage="changePage('Settings')" />
        </template>
    </div>

</template>

<script lang="ts">
import {useStore} from "../store";
import {defineComponent} from 'vue';
import CityItem from '../components/CityItem.ce.vue'
import Header from '../components/Header.ce.vue'
import {storeToRefs} from "pinia";

export default defineComponent({
    name: 'Main',
    components: {
        CityItem,
        myHeader: Header
    },
    computed: {
        citiesList() {
            const cities = JSON.parse(JSON.stringify(this.cities))
            if (this.myCity) {
                cities.unshift(this.myCity)
            }
            return cities
        }
    },
    setup() {
        const store = useStore()

        const {getCities, getMyCity} = storeToRefs(store)

        return {
            //  Actions
            changePage: store.changePage,
            //  Getters
            cities: getCities,
            myCity: getMyCity
        }
    }
});
</script>