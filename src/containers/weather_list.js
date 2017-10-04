import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import Chart from '../components/chart';
import GoogleMap from '../components/google_maps';

class WeatherList extends Component {
    renderWeather(cityData){
        const name = cityData.city.name;
        const temps = cityData.list.map(weather=> weather.main.temp);
        const pressures = cityData.list.map(weather=> weather.main.pressure);
        const humidities = cityData.list.map(weather=> weather.main.humidity);
        const { lon,lat } = cityData.city.coord;

        return(
            <tr key={name}>
                <td><GoogleMap lon={lon} lat={lat}/></td>
                <td>
                    <Chart data={temps} color="orange"  units="K"/>
                </td>
                <td>
                    <Chart data={pressures} color="green" units="hPa"/>
                </td>
                <td>
                    <Chart data={humidities} color="black" units="%"/>
                </td>
            </tr>
        )
    }
    render () {
        return (
            <Table responsive hover>
            <thead>
                <tr>
                    <th width="25%">City</th>
                    <th width="25%">Temperature (K)</th>
                    <th width="25%">Pressure (hPa)</th>
                    <th width="25%">Humidity (%)</th>

                </tr>
            </thead>
            <tbody>
            
                {this.props.weather.map(this.renderWeather)}
            </tbody>
        </Table>

        )
        
    }
}

// function mapStateToProps(state) {
//     return { weather : state.weather }
// }

//Or

function mapStateToProps({ weather }){
    return { weather };
}

export default connect(mapStateToProps)(WeatherList)

