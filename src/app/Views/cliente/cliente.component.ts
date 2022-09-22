import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministradorService } from '../../Services/administrador.service';
import { AdminI } from '../../Models/Admin.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { LoginService } from '../../Services/login.service';
import { MatSort } from '@angular/material/sort';




@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit, AfterViewInit {
  

  displayedColumns: string[] = [
    'id',
    'ciudadOrigen',
    'ciudadDestino',
    'fecha',
    'horaSalida',
    'horaLlegada',
    'numeroVuelo',
    'aerolinea',
    'estadoVuelo',
  ];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource<AdminI>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vApiService: AdministradorService,
    private vApiServices: LoginService,
    private vRouter: Router
  ) {}

  ngOnInit(): void {
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

  GetAllVuelos() {
    this.vApiService.getAllVuelos().subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
    });
  }
}
