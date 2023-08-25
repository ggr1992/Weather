import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  myWeather: any;
  temperature: number = 0;
  feelsLikeTemperature: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconUrl: string = '';
  city: string = 'London';
  units: string = 'metric';
  newCity: string = '';
  errorMessage: string = ''
  

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // You can initiate the weather data fetch directly in ngOnInit
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    this.weatherService.getWeather(this.city, this.units).subscribe({
      next: (res) => {
        console.log(res);
        this.myWeather = res;
        console.log(this.myWeather);
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemperature = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;

        this.iconUrl = `https://openweathermap.org/img/wn/${this.myWeather.weather[0].icon}@2x.png`;
      },
      error: (error) => {
        console.log(error.message);
        this.city = 'City not found. Please try again.'; 
        this.resetValues(); 
      },
      complete: () => console.info('API Call Completed'),
    });
  }
  onCityInputChange(newCity: string) {
    this.city = newCity; 
  }

  searchCity() {
    this.city = this.newCity; 
    this.fetchWeatherData();  
  }
  resetValues() {
  
    this.myWeather = null;
    this.temperature = 0;
    this.feelsLikeTemperature = 0;
    this.humidity = 0;
    this.pressure = 0;
    this.summary = '';
    this.iconUrl = '';
  }
}
