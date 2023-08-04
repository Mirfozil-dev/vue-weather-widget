<template>
    <div class="loading-overlay" :class="loading && 'loading'">
        <slot />
        <span class="loading-overlay__loader">Loading...</span>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LoadingOverlay',
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
});
</script>

<style scoped>

</style>