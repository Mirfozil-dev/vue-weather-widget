import {defineStore} from 'pinia'
import {getCitiesWeather, getCityWeather, getCityWeatherByCoords} from '../services/api'
import {City, Message} from "../types";

const geo = navigator.geolocation;

export const useStore = defineStore('store', {
    state: () => ({
        page: 'Main' as 'Main' | 'Settings',
        cities: [] as City[],
        myCity: {} as City,
        loading: false as boolean,
        message: {
            type: '',
            text: ''
        } as Message
    }),
    getters: {
        getPage: state => state.page,
        getLoading: state => state.loading,
        getMessage: state => state.message,
        getCities: state => state.cities,
        getMyCity: state => state.myCity,
    },
    actions: {
        changePage(page: 'Main' | 'Settings') {
            this.page = page
        },
        changeLoading(val: boolean) {
            this.loading = val
        },
        updateLocalStorage() {
            localStorage.setItem('citiesIds', JSON.stringify(this.cities.map(city => city.id)))
        },
        flashMessage(type: string, text: string) {
            this.message.type = type
            this.message.text = text
            setTimeout(() => {
                this.message.type = ''
                this.message.text = ''
            }, 3000)
        },
        async loadSavedCities() {
            const savedCitiesJson = localStorage.getItem('citiesIds')
            if (savedCitiesJson) {
                const savedCities = JSON.parse(savedCitiesJson)
                if (savedCities.length > 0) {
                    this.loading = true
                    await getCitiesWeather(savedCities)
                        .then((r: any) => {
                            if (r.data) {
                                this.cities = r.data.list
                            }
                        }).catch(er => {
                            this.flashMessage('error', 'Loading error!')
                        }).finally(() => {
                            this.loading = false
                        })
                }
            }
        },
        async loadCity(cityName: string) {
            this.loading = true
            await getCityWeather(cityName)
                .then((r: any) => {
                    if (r.data) {
                        this.cities.push(r.data)
                        this.updateLocalStorage()
                    }
                }).catch(er => {
                    this.flashMessage('error', 'City not found!')
                }).finally(() => {
                    this.loading = false
                })
        },
        deleteCity(id: number) {
            const i: number = this.cities.findIndex((city: City) => city.id === id)
            this.cities.splice(i, 1)
            this.updateLocalStorage()
        },
        loadMyCity() {
            const callBack: PositionCallback = async (pos: GeolocationPosition) => {
                this.loading = true
                try {
                    const coords = {
                        lat: Math.round(pos.coords.latitude * 100) / 100,
                        long: Math.round(pos.coords.longitude * 100) / 100,
                    };


                    const res: any = await getCityWeatherByCoords({lat: coords.lat, long: coords.long})
                    const {data} = res;
                    if (data) {
                        this.myCity = data
                    }

                } catch (error) {
                    this.flashMessage('error', 'Loading error!')
                } finally {
                    this.loading = false
                }
            }
            geo.getCurrentPosition(callBack);
        }
    }

})