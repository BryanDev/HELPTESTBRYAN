import { Routes } from '@angular/router';
import path from 'path';
import { LoginComponent } from './componentes/login/login.component';
import { PaginaprincipalComponent } from './componentes/paginaprincipal/paginaprincipal.component';

export const routes: Routes = [
  {path :'', component:LoginComponent},
  {path :'paginaprincipal',component:PaginaprincipalComponent}
];
