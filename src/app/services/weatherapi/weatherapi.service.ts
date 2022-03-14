import { Injectable } from '@angular/core';
import { ILogin } from '../../Models/login.interface';
import { IResponse } from '../../Models/response.interface';
import { IWeather } from '../../Models/weather.interface';
import { ICity } from '../../Models/city.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherapiService {

  urlbase = 'http://localhost:1400/api/v1/';
  constructor(private http: HttpClient ) { }

  loginByEmail(form: ILogin): Observable<IResponse>{
    const url = `${this.urlbase}auth`;
    return this.http.post<IResponse>(url, form);
  }

  getWeatherByCity(city: string): Observable<IWeather>{
    const url = `${this.urlbase}weather/${city}` ;
    return this.http.get<IWeather>(url);
  }

  getWeatherHistoricalByCity(city: string): Observable<IWeather[]>{
    const url = `${this.urlbase}weather/${city}/historical` ;
    return this.http.get<IWeather[]>(url);
  }

  getAllCity(): Observable<ICity[]>{
    const url = `${this.urlbase}cities`;
    return this.http.get<ICity[]>(url);
  }
}
