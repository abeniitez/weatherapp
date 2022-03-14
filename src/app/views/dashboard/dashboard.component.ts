import { Component, OnInit, NgModule } from '@angular/core';
import { WeatherapiService } from '../../services/weatherapi/weatherapi.service';
import { Router } from '@angular/router';

import { IWeather } from '../../Models/weather.interface';
import { ICity } from '../../Models/city.interface';
import { templateJitUrl } from '@angular/compiler';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedCity: string;
  city = '';
  weather = '';
  thermalSensation = '';
  mostrar = false;
  checked = false;

  historics: IWeather[];
  cities: ICity[];

  constructor(private weatherapi: WeatherapiService, private router: Router) { }

  ngOnInit(): void {
    this.selectedCity = 'Seleccione la Ciudad...';
    this.weatherapi.getAllCity().subscribe(data => {
      console.log(data);
      this.cities = data;
    });
  }

  // capture(event: any): string{
  //   //this.selectedCity = event.target.selected;
  //   console.log(this.selectedCity);
  //   return this.selectedCity;
  // }

  CheckHistory(event: any): boolean{
    this.checked = event.target.checked;
    console.log(this.checked);
    return this.checked;
  }

  onClick(): void{

    if (this.selectedCity.trim() !== 'Seleccione la Ciudad...'.trim()){
      console.log(this.selectedCity);
      this.weatherapi.getWeatherByCity(this.selectedCity).subscribe(data => {
        this.setWeatherValues(data);
      });
      this.mostrar = this.checked;

    }



    if ( this.checked && this.selectedCity.trim() !== 'Seleccione la Ciudad...'.trim() )
    {

      console.log(this.selectedCity);

      this.weatherapi.getWeatherHistoricalByCity(this.selectedCity).subscribe(weather => {
        console.log(weather);
        this.historics = weather;
      });
    }
  }

  setWeatherValues(weather: IWeather): void{
    this.city = `${weather.city}, ${weather.country}` ;
    this.weather = weather.weather;
    this.thermalSensation = weather.thermalSensation;
  }
}
