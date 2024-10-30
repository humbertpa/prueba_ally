import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ClimaComponent } from './dashboard/clima/clima.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'clima', component: ClimaComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: '', redirectTo: 'clima', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/dashboard/clima', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard/clima' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
