import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private location = inject(LocationService);
  toadysDate = new Date().toISOString().slice(0, 10);
  mainUrl = 'https://api.meteomatics.com/';
  mainZipUrl = 'https://zip-api.eu/api/v1/info/';

  latitude: number | undefined;
  longitude: number | undefined;
  error: string | undefined;
  temperatureOfLocation: string | undefined;
  currentCity: string | undefined;
  currentTime: string | undefined; 

  constructor() {
    
  }

  ngOnInit(): void {
    this.getLocation();
    this.getCurrentTime();
    setTimeout(() => {
      this.getWeatherData();
      this.getCityName();
    }, 500);
        
  }

  getLocation(): void {
    this.location.getCurrentLocation()
      .then(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(position);
        
      })
      .catch(error => {
        this.error = error.message || 'Unable to retrieve location';
      });
  }

  getCurrentTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let allTime = `${hours}:${minutes}:00`;
    this.currentTime = allTime;    
  }

  async getWeatherData() {
    let url = this.mainUrl + `/${this.toadysDate}T${this.currentTime}Z/t_2m:C/${this.latitude},${this.longitude}/json`;
    let response = await fetch(url, {
      headers: {
          'Authorization': 'Basic ' + btoa('_schoenfelder_florian' + ':' + 'tM8RE0O2fv')
      }
  });
  if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status);
  }
    let responseAsJson = await response.json();
    this.temperatureOfLocation = responseAsJson.data[0].coordinates[0].dates[0].value;
    // console.log(responseAsJson.data[0].coordinates[0].dates[0].value);
    console.log(responseAsJson.data);
  }


  async getCityName() {
    let url = this.mainZipUrl + `${this.latitude},${this.longitude}`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    // console.log(responseAsJson);
    
    this.currentCity = responseAsJson.place_name;
  } 




}
