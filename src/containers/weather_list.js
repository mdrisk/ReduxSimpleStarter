import React, { Component } from 'react';
import { connect } from 'react-redux';

import WeatherChart from '../components/weather_chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather =>
      Math.round(9 / 5 * (weather.main.temp - 273) + 32)
    );
    const humidities = cityData.list.map(weather => weather.main.humidity);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const { lon, lat } = cityData.city.coord;

    // console.log('temps: ', temps);
    return (
      <tr key={name}>
        <td>
          <GoogleMap lat={lat} lon={lon} />
        </td>
        <td>
          <WeatherChart data={temps} color="orange" units="° F" />
        </td>
        <td>
          <WeatherChart data={pressures} color="blue" units=" hPa" />
        </td>
        <td>
          <WeatherChart data={humidities} color="green" units=" %" />
        </td>
      </tr>
    );
  }
  //this.props.weather.list.main.temps.map()
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (F)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>{this.props.weather.map(this.renderWeather)}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
