import React from 'react';
import Loading from "./Loading";
import Weather from "./Weather";
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import axios from "axios";

const API_KEY = "dad02d25637f762320d1d3f1b8d17805";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async(latitude, longitude) => {
    const { data: {
      main :{temp}, 
      weather 
    }
  } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
    );
    this.setState({isLoading:false, condition: weather[0].main, temp: temp
    });
  };
  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const {coords: { latitude, longitude} } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      this.setState({isLoading: false});
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
    
  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  }
}