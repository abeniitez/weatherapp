import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WeatherapiService } from '../../services/weatherapi/weatherapi.service';
import { ILogin } from '../../Models/login.interface';

import { Router } from '@angular/router';
import { IResponse } from '../../Models/response.interface';
//import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)

  });

  constructor(private weatherapi: WeatherapiService, private router: Router) { }

  errorStatus = false;
  errorMsj: any = '';

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(): void{
    if (localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
  }

  onLogin(form: ILogin): void{

    console.log(form);
    this.weatherapi.loginByEmail(form).subscribe(data => {
      console.log(data);
      let dataResponse: IResponse = data;
      if (dataResponse.status.toLowerCase() === 'ok'){
        localStorage.setItem('token', dataResponse.result.token);
        this.router.navigate(['dashboard']);
      }else{
        this.errorStatus = true;
        this.errorMsj = data.status;
      }

    });

  }

}
