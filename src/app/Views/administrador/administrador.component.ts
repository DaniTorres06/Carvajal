import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministradorService } from '../../Services/administrador.service';
import { AdminI } from '../../Models/Admin.interface';
import { CiudadI } from '../../Models/Ciudad.interface';
import { LoginService } from '../../Services/login.service';
import Swal  from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
})
export class AdministradorComponent implements OnInit, AfterViewInit {
  vArrVuelo!: AdminI[];
  vArrCity?: CiudadI[];
  vNumVuelo: number = 5;
  filterPost = "";

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

  displayedColumns: string[] = [    
    'ciudadOrigen',    
    'fecha',    
    'numeroVuelo'    
  ];

  dataSource = new MatTableDataSource<AdminI>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  CreateForm = new FormGroup({
    ciudadOrigen: new FormControl('-- Seleccione la ciudad de origen', Validators.required),
    ciudadDestino: new FormControl('-- Seleccione la ciudad de destino', Validators.required),
    fecha: new FormControl('Fecha', Validators.required),
    horaSalida: new FormControl('FechaSalida', Validators.required),
    horaLlegada: new FormControl('FechaLlegada', Validators.required),
    numeroVuelo: new FormControl(this.GetNumRandomVuelo(), Validators.required),
    aerolinea: new FormControl('-- Aerolinea de preferencia', Validators.required),
    estadoVuelo: new FormControl('-- Estado del vuelo', Validators.required),
  });

  constructor(
    private vApiService: AdministradorService,
    private vApiServices: LoginService,
    private vRouter: Router
  ) {}

  ngOnInit(): void {
    this.GetAllCity();
    this.GetAllVuelos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel='Items por pagina';

    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Agrega un nuevo registro de vuelo
  AddNewVuelo(form: AdminI) {
    let vCiudadOrigen = this.CreateForm.get('ciudadOrigen')!.value;
    let vCiudadDestino = this.CreateForm.get('ciudadDestino')!.value;
    let vStrMsj = "";

    vStrMsj = this.ValidateForm();
    console.log(vStrMsj);

    //console.log("Mensajes: " + vStrMsj);

    if (vStrMsj.length > 0) {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: vStrMsj,
        showConfirmButton: false,
        timer: 1500,
      });
      
    } else {
      //console.log(form);
      if(this.CreateForm.valid){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro de vuelo guardado.',
          showConfirmButton: false,
          timer: 2500,              
      });      
        this.vApiService.addVuelo(form).subscribe((data) => {
          console.log(data);
        });
      }
      
      else{

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Algo ocurrio',
          showConfirmButton: false,
          timer: 1500,
        });

        console.log('No valid');
      }
      
      //Clean campos
      //this.CreateForm.reset();
      
      
      //location.reload();
      //this.CreateForm.reset();
      //this.vRouter.navigate(['ClienteComponent']);
    }
    //location.reload();
    this.GetAllVuelos();
  }

  GetAllVuelos() {
    var vMax = 0;
    this.vApiService.getAllVuelos().subscribe((data) => {      
      console.log(data);
      this.vArrVuelo = data;
      this.dataSource.data = data;

      this.vArrVuelo.forEach((object: any) => {
        if (vMax < object.numeroVuelo) {
          vMax = object.numeroVuelo;
        }
      });
    });
  }

  GetAllCity(){    
    this.vApiService.GetAllCiudad().subscribe((data) => {
      //console.log(data);
      this.vArrCity = data;
    });    
  }

  GetNumRandomVuelo(): number {
    return Math.floor(Math.random() * 6254423);
  }

  deleteVuelo(vId: number){
    Swal.fire({
      title: '¿Esta seguro de eliminar el registro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'No eliminar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.vApiService.deleteVuelo(vId).subscribe( data => {
          console.log(data);
          this.GetAllVuelos();
        })
        Swal.fire('Eliminado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('La informacion no se elimino', '', 'info')
      }
    })
  }

  editVuelo(vId: number){
    this.vRouter.navigate(['EditAdminComponent',vId]);
  }

  ValidateForm():string{
    let vValidateForm = "";
    let vValCiudadOrigen = "";
    let vValCiudadDestino = "";
    let vValFecha = ""
    let vValHoraSalida = ""
    let vValHoraLlegada = ""
    let vValNumVuelo = ""
    let vValAerolinea = ""
    let vValEstadoVuelo = ""
    
    

    // Se llenan variables de formulario.
    vValCiudadOrigen = this.CreateForm.get('ciudadOrigen')!.value;
    vValCiudadDestino = this.CreateForm.get('ciudadDestino')!.value;    
    vValFecha = this.CreateForm.get('fecha')!.value;    
    vValHoraSalida = this.CreateForm.get('horaSalida')!.value;
    vValHoraLlegada = this.CreateForm.get('horaLlegada')!.value;
    vValNumVuelo = this.CreateForm.get('numeroVuelo')!.value;
    vValAerolinea = this.CreateForm.get('aerolinea')!.value;
    vValEstadoVuelo = this.CreateForm.get('estadoVuelo')!.value;
    /**/

    // La ciudad no puede ser igual.
    if (vValCiudadOrigen == vValCiudadDestino){
      vValidateForm = "La ciudad origen no puede ser igual a la ciudad destino";
    }
    else{
      vValidateForm = "";
    }

    // Valida ciudad origen
    if(vValCiudadOrigen == "-- Seleccione la ciudad de origen"){
      vValidateForm = "Debe seleccionar una ciudad origen";
      return vValidateForm;
    }
    else{
      vValidateForm = ""
    }
    
    //console.log("estoy validando destino: " + vValCiudadOrigen + " otro: " + vValCiudadDestino)
    

    //Valida ciudad destino
    if(vValCiudadDestino == "-- Seleccione la ciudad de destino"){
      vValidateForm = "Debe seleccionar una ciudad destino";      
      return vValidateForm;
    }
    else{
      vValidateForm = ""
    }

    //Valida fehca
    if(vValFecha == "Fecha" ){
      vValidateForm = "Debe seleccionar una fecha";      
      return vValidateForm;
    }
    else{
      vValidateForm = ""
    }

    //console.log("Mensajes: " + vValidateForm + "esta es " + vValFecha)

    if(vValHoraSalida == "FechaSalida"){
      vValidateForm = "Debe seleccionar un horario de salida.";      
      return vValidateForm;
    }
    else{
      vValidateForm = ""
    }

    if(vValHoraLlegada == "FechaLlegada"){
      vValidateForm = "Debe seleccionar un horario de llegada.";      
      return vValidateForm;
    }
    else{
      vValidateForm = ""
    }

    if(vValAerolinea == "-- Aerolinea de preferencia"){
      vValidateForm = "Por favor seleccione la aerolinea de preferencia.";
      return vValidateForm;
    }
    else{
      vValidateForm = ""
    }

    if(vValEstadoVuelo == "-- Estado del vuelo"){
      vValidateForm = "Por favor seleccione un estado para la reserva.";
      return vValidateForm;
    }
    else{
      vValidateForm = ""
    }

    return vValidateForm;
  }


  
}
