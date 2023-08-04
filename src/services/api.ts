import axios, {AxiosResponse} from "axios";
import {API_KEY, API_URL} from '../config'


export const getCityWeather = (cityName: string) => {
    return new Promise((resolve, reject) => {
        axios.get<AxiosResponse>(`${API_URL}/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
            .then(response => resolve(response))
            .catch(err => reject(err));
    })
}

export const getCitiesWeather = (ids: number[]) => {
    return new Promise((resolve, reject) => {
        axios.get<AxiosResponse>(`${API_URL}/data/2.5/group?id=${ids.join()}&appid=${API_KEY}&units=metric`)
            .then(response => resolve(response))
            .catch(err => reject(err));
    })
}
export const getCityWeatherByCoords = ({lat, long}: { lat: number, long: number }) => {
    return new Promise((resolve, reject) => {
        axios.get<AxiosResponse>(`${API_URL}/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
            .then(response => resolve(response))
            .catch(err => reject(err));
    })
}
