import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather'


//Any key to the object  we provide to combineReducers will end up as key on our
// global state
const rootReducer = combineReducers({
  weather: WeatherReducer
});

export default rootReducer;