<template>
    <div class="city-input">
        <label for="city_name">
            Add Location:
        </label>
        <div class="city-input__body">
            <input @keypress.enter="$emit('checkCityName')" :value="cityName"
                   @input="e => changeCityName(e)"
                   id="city_name" type="text">
            <icon @click="$emit('checkCityName')" name="ArrowEnter" width="20px" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Icon from '../components/Icon.ce.vue';

export default defineComponent({
    name: 'CityInput.ce',
    components: {
        Icon,
    },
    props: {
        cityName: {
            type: String,
        },
    },
    methods: {
        changeCityName(e) {
            this.$emit('changeCityName', e.target.value);
        },
    },
});
</script>

<style scoped>

</style>