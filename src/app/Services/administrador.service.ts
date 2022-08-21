import { Injectable } from '@angular/core';
import { AdminI } from '../Models/Admin.interface'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  url: string = "/api/ClsAdministradors/";
  //vLstUsuario: clsUsuario[] | undefined;

  constructor(private http:HttpClient) { }

  addVuelo(vVuelo:AdminI): Observable<AdminI>{
    return this.http.post<AdminI>(this.url,vVuelo);
  }

  getAllVuelos():Observable<AdminI[]>{
    return this.http.get<AdminI[]>(this.url);
    
  }
}
