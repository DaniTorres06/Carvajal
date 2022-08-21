import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministradorService } from '../../Services/administrador.service';
import { AdminI } from '../../Models/Admin.interface'

import { LoginService } from '../../Services/login.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  vArrVuelo: AdminI[]  | undefined;

  constructor(private vApiService:AdministradorService,
              private vApiServices:LoginService,
              private vRouter: Router) { }

  ngOnInit(): void {
    this.GetAllVuelos();
  }

  GetAllVuelos(){   
    this.vApiService.getAllVuelos().subscribe( data =>{
      //console.log(data);
      this.vArrVuelo = data;
    });

  }



}
