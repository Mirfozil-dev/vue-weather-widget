<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height || width"
    >
        <component :is="name" />
    </svg>
</template>

<script>
import { defineComponent } from 'vue';
import ArrowPlane from '../icons/ArrowPlane.vue';
import ArrowEnter from '../icons/ArrowEnter.vue';
import Bars from '../icons/Bars.vue';
import Droplet from '../icons/Droplet.vue';
import Eye from '../icons/Eye.vue';
import Gear from '../icons/Gear.vue';
import Pressure from '../icons/Pressure.vue';
import Trash from '../icons/Trash.vue';
import XMark from '../icons/XMark.vue';

export default defineComponent({
    name: 'Icon',
    components: {
        ArrowPlane,
        ArrowEnter,
        Bars,
        Droplet,
        Eye,
        Gear,
        Pressure,
        Trash,
        XMark,
    },
    props: {
        name: {
            type: String,
            default: '',
        },
        width: {
            type: String,
            default: '',
        },
        height: {
            type: String,
            default: '',
        },
    },
});
</script>

<style scoped>

</style>