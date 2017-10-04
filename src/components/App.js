
import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
import SearchBar from '../containers/search_bar';
import WeatherList from '../containers/weather_list'



class  App extends Component {
  
  render() {
    return (
      <div>
       
      <div className="App">
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2> React</h2>
        </div>
        <br/>
        
      </div>
      <div className="container">

      <SearchBar />
      <WeatherList />
      </div>
      </div>
      ) 
  }
  
}




export default App;
