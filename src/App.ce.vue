<template>
    <div class="app">
        <loading-overlay :loading="loading">
            <transition name="translate" mode="out-in">
                <component
                    :is="page"
                />
            </transition>
        </loading-overlay>
        <div class="message" :class="messageClass">
            {{ message.text }}
        </div>
    </div>
</template>

<script lang="ts">
import Main from './views/Main.ce.vue'
import Settings from './views/Settings.ce.vue'
import LoadingOverlay from './components/LoadingOverlay.ce.vue'
import {defineComponent} from 'vue';
import {useStore} from "./store";
import {storeToRefs} from 'pinia'

export default defineComponent({
    name: 'App',
    components: {Main, Settings, LoadingOverlay},
    mounted() {
        this.loadMyCity()
        this.loadSavedCities()
    },
    setup() {
        const store = useStore()
        const {getPage, getLoading, getMessage} = storeToRefs(store)

        return {
            page: getPage,
            loading: getLoading,
            message: getMessage,
            loadSavedCities: store.loadSavedCities,
            loadMyCity: store.loadMyCity,
        }
    },
    computed: {
        messageClass() {
            let result = ''
            switch (this.message?.type) {
                case 'success':
                    result = 'message_success'
                    break;
                case 'error':
                    result = 'message_error'
                    break;
            }
            return result
        }
    }
});
</script>

<style lang="scss">
@import "@/assets/styles/style.scss";
</style>
