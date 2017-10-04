import axios from 'axios';

const API_KEY = '34277b87e525def5aeb77a6b15e19e31';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city){
    const url = `${ROOT_URL}&q=${city},IN`;
    const request = axios.get(url);

    console.log(request)

    return {
        type: FETCH_WEATHER,
        payload: request
    }
}