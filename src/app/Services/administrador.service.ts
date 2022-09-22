import { Injectable } from '@angular/core';
import { AdminI } from '../Models/Admin.interface'
import { CiudadI } from '../Models/Ciudad.interface'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  url: string = "/api/ClsAdministradors/";
  urlCiudad: string = "/api/ClsCiudades/";
  urlVuelos: string = "/api/ClsUsuarios/";  
  //vLstUsuario: clsUsuario[] | undefined;

  constructor(private http:HttpClient) { }

  //Adiciona informacion del vuelo
  addVuelo(vVuelo:AdminI): Observable<AdminI>{
    return this.http.post<AdminI>(this.url,vVuelo);
  }

  //Obtiene listado de todos los vuelos // vista del cliente
   getAllVuelos():Observable<AdminI[]>{
    return this.http.get<AdminI[]>(this.url);    
  }

  //Obtiene la informacion de las ciudades.
  GetAllCiudad():Observable<CiudadI[]>{
    return this.http.get<CiudadI[]>(this.urlCiudad);    
  }

  //Elimina registro de vuelo
  deleteVuelo(vIdVuelo: number): Observable<Object>{
    return this.http.delete(`${this.url}/${vIdVuelo}`);
  }

  GetSingleVuelo(vIdVuelo:any): Observable<AdminI>{
    return this.http.get<AdminI>(`${this.url}/${vIdVuelo}`);
  }


  
}
