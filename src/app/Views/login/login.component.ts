import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validator, Validators } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { LoginI } from '../../Models/Login.interface';
import { Router } from '@angular/router';
import { ResponseI } from '../../Models/Response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    user: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  vErrorStatus: boolean = false;
  vErrorMsg: string = "";

  vCodigoRol: number = 0;

  constructor(private vApiService:LoginService,
              private vRouter: Router) { }

  ngOnInit(): void {
    //this.CkeckLocalSt()

  }

  OnLogin(form: LoginI){

    let vUser = this.loginForm.get('user')!.value;
    let vPassword = this.loginForm.get('password')!.value;

    this.vApiService.Login(form, vUser,vPassword).subscribe(data =>{
      let vDataResponse:ResponseI = data;
      console.log(data);

      // Lectura del codigo de Rol
      vDataResponse.vObjData.forEach((object:any) =>{
        //console.log(object.codigoRol);
        this.vCodigoRol = object.codigoRol
      })

      if (vDataResponse.vBoolExito){
        localStorage.setItem("Token",vDataResponse.vStrToken);       
        
        // Redireccionamiento
        if (this.vCodigoRol == 1){
          this.vRouter.navigate(['AdministradorComponent']);
          //console.log("Admin");
        }
        else{
          this.vRouter.navigate(['ClienteComponent']);
          //console.log("Cliente");
        }
      }
      else{
        this.vErrorStatus = true;
        this.vErrorMsg = vDataResponse.vStrMensaje;
      }
    })
  }

  // Valida si el token esta activo
  /*
  CkeckLocalSt()
  {
    if (localStorage.getItem('Token')){      
      if (this.vCodigoRol == 1){
        this.vRouter.navigate(['AdministradorComponent']);
        //console.log("Admin");
      }
      else{
        this.vRouter.navigate(['ClienteComponent']);
        //console.log("Cliente");
      }
    }
  }
  */


}
