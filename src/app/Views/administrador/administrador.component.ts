import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministradorService } from '../../Services/administrador.service';
import { AdminI } from '../../Models/Admin.interface';
import { LoginService } from '../../Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
})
export class AdministradorComponent implements OnInit {
  vArrVuelo: AdminI[] | undefined;
  vNumVuelo: number = 5;

  vArrCiudad = [
    { name: 'BOGOTA' },
    { name: 'MEDELLIN' },
    { name: 'CALI' },
    { name: 'BARRANQUILLA' },
    { name: 'CARTAGENA' },
    { name: 'CÚCUTA' },
    { name: 'SOLEDAD' },
    { name: 'IBAGUE' },
    { name: 'BUCARAMANGA' },
    { name: 'SANTA MARTA' },
    { name: 'VILLAVICENCIO' },
    { name: 'SOACHA' },
    { name: 'PEREIRA' },
    { name: 'BELLO' },
    { name: 'VALLEDUPAR' },
    { name: 'MONTERIA' },
    { name: 'PASTO' },
    { name: 'MANIZALES' },
    { name: 'BUENAVENTURA' },
    { name: 'NEIVA' },
    { name: 'BARRANCABERMEJA' },
    { name: 'PALMIRA' },
    { name: 'ARMENIA' },
    { name: 'POPAYAN' },
    { name: 'SINCELEJO' },
    { name: 'ITAGUI' },
    { name: 'FLORIDABLANCA' },
    { name: 'RIOHACHA' },
    { name: 'ENVIGADO' },
    { name: 'TULUA' },
    { name: 'DOSQUEBRADAS' },
    { name: 'SAN ANDRES DE TUMACO' },
    { name: 'TUNJA' },
    { name: 'GIRON' },
    { name: 'APARTADO' },
    { name: 'FLORENCIA' },
    { name: 'URIBIA' },
    { name: 'IPIALES' },
    { name: 'TURBO' },
    { name: 'MAICAO' },
    { name: 'PIEDECUESTA' },
    { name: 'YOPAL' },
    { name: 'OCAÑA' },
    { name: 'FUSAGASUGA' },
    { name: 'CARTAGO' },
    { name: 'FACATATIVA' },
    { name: 'CHIA' },
    { name: 'MAGANGUE' },
    { name: 'PITALITO' },
    { name: 'CAUCASIA' },
    { name: 'ZIPAQUIRA' },
    { name: 'MALAMBO' },
    { name: 'RIONEGRO' },
    { name: 'LORICA' },
    { name: 'JAMUNDI' },
    { name: 'QUIBDO' },
    { name: 'GUADALAJARA DE BUGA' },
    { name: 'YUMBO' },
    { name: 'SOGAMOSO' },
    { name: 'DUITAMA' },
    { name: 'GIRARDOT' },
    { name: 'CIENAGA' },
  ];

  vStateVuelo = [{ name: 'Activo' }, { name: 'Inactvio' }];

  vAerolinea = [
    { name: 'Avianca' },
    { name: 'Wingo ' },
    { name: 'SATENA' },
    { name: 'EasyFly' },
    { name: 'LATAM Colombia' },
    { name: 'Regional Express Americas SAS' },
    { name: 'AerCaribe' },
  ];

  CreateForm = new FormGroup({
    ciudadOrigen: new FormControl('', Validators.required),
    ciudadDestino: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    horaSalida: new FormControl('', Validators.required),
    horaLlegada: new FormControl('', Validators.required),
    numeroVuelo: new FormControl(this.GetNumRandomVuelo(), Validators.required),
    aerolinea: new FormControl('', Validators.required),
    estadoVuelo: new FormControl('', Validators.required),
  });

  constructor(
    private vApiService: AdministradorService,
    private vApiServices: LoginService,
    private vRouter: Router
  ) {}

  ngOnInit(): void {}

  // Agrega un nuevo registro de vuelo
  AddNewVuelo(form: AdminI) {
    let vCiudadOrigen = this.CreateForm.get('ciudadOrigen')!.value;
    let vCiudadDestino = this.CreateForm.get('ciudadDestino')!.value;

    if (vCiudadOrigen == vCiudadDestino) {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'La ciudad origen debe ser distinta a la de destino',
        showConfirmButton: false,
        timer: 1500,
      });
      
    } else {
      //console.log(form);
      this.vApiService.addVuelo(form).subscribe((data) => {
        console.log(data);
      });
      //Clean campos
      //this.CreateForm.reset();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Registro de vuelo guardado.',
        showConfirmButton: false,
        timer: 2500,
      });
      //location.reload();
      this.CreateForm.reset();
    }
  }

  GetAllVuelos() {
    var vMax = 0;
    this.vApiService.getAllVuelos().subscribe((data) => {
      console.log(data);
      this.vArrVuelo = data;

      this.vArrVuelo.forEach((object: any) => {
        if (vMax < object.numeroVuelo) {
          vMax = object.numeroVuelo;
        }      
      });      
    });    
  }

  GetNumRandomVuelo(): number {
    return Math.floor(Math.random() * 6254423);
  }
}
