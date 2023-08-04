<template>
    <div class="header">
        <h6 class="header__title">{{ title }}</h6>
        <icon v-if="icon" class="header__button" @click="$emit('changePage')"
              :name="icon" width="20px" height="20px" />
    </div>
</template>

<script>
import Icon from './Icon.ce.vue';

export default {
    name: 'Header.ce',
    components: {
        Icon,
    },
    props: {
        title: String,
        icon: {
            type: [String, Boolean],
            default: false,
        },
    },
};
</script>

<style scoped>

</style>