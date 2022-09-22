import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminI } from 'src/app/Models/Admin.interface';
import { AdministradorService } from '../../Services/administrador.service'
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { CiudadI } from 'src/app/Models/Ciudad.interface';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  vIdVuelo: string | null = "";  
  vArrVuelo?: AdminI;
  vArrCity?: CiudadI[];
  

  vStateVuelo = [{ name: 'Activo' }, { name: 'Inactvio' }];

  vAerolinea = [
    { id:1, name: 'Avianca' },
    { id:2, name: 'Wingo' },
    { id:3, name: 'SATENA' },
    { id:4, name: 'EasyFly' },
    { id:5, name: 'LATAM Colombia' },
    { id:6, name: 'Regional Express Americas SAS' },
    { id:7, name: 'AerCaribe' },
  ];

  EditForm = new FormGroup({
    ciudadOrigen: new FormControl(''),
    ciudadDestino: new FormControl(''),
    fecha: new FormControl(''),
    horaSalida: new FormControl(''),
    horaLlegada: new FormControl(''),
    numeroVuelo: new FormControl(''),
    aerolinea: new FormControl(''),
    estadoVuelo: new FormControl('')
  });


  constructor(
    private vRouter:Router,
    private vActiveRoute: ActivatedRoute,
    private vAdminService: AdministradorService
  ) { }

  ngOnInit(): void {
    this.vIdVuelo = this.vActiveRoute.snapshot.paramMap.get('vId')
    this.GetVuelosbyId();
    this.GetAllCity();
  }

  GetVuelosbyId() {
    var vMax = 0;
    this.vAdminService.GetSingleVuelo(this.vIdVuelo).subscribe((data) => {
      console.log(data);
      this.vArrVuelo = data;
      this.EditForm.setValue({
        'ciudadOrigen': this.vArrVuelo.ciudadOrigen,
        'ciudadDestino': this.vArrVuelo.ciudadDestino,
        'fecha' : this.vArrVuelo.fecha,
        'horaSalida': this.vArrVuelo.horaSalida,
        'horaLlegada': this.vArrVuelo.horaLlegada,
        'numeroVuelo': this.vArrVuelo.numeroVuelo,
        'aerolinea': this.vArrVuelo.aerolinea,
        'estadoVuelo': this.vArrVuelo.estadoVuelo
      })      
    });

    
  }

  GetAllCity(){
    this.vAdminService.GetAllCiudad().subscribe((data) => {
      //console.log(data);
      this.vArrCity = data;
    });    
  }
  

}
