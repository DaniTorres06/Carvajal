import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './Views/administrador/administrador.component';
import { ClienteComponent } from './Views/cliente/cliente.component';
import { EditAdminComponent } from './Views/edit-admin/edit-admin.component';
import { LoginComponent } from './Views/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'LoginComponent', pathMatch: 'full'},
  {path: 'LoginComponent', component: LoginComponent},
  {path: 'ClienteComponent', component: ClienteComponent},
  {path: 'AdministradorComponent', component: AdministradorComponent},
  {path: 'EditAdminComponent/:vId', component: EditAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [LoginComponent,ClienteComponent,AdministradorComponent]
