import { Injectable } from '@angular/core';
import { LoginI } from '../Models/Login.interface'

import { AdminI } from '../Models/Admin.interface'

import { ResponseI } from '../Models/Response.interface'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "/api/ClsUsuarios/";  

  constructor(private http:HttpClient) { }

  Login(form:LoginI,pvUser:string,pvPassword:string):Observable<ResponseI>{
    let vLogin = this.url + pvUser +","+ pvPassword
    return this.http.post<ResponseI>(vLogin,form)
  } 


}
