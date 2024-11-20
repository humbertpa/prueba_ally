import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClimaComponent } from './dashboard/clima/clima.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { environment } from '../environments/environment';
import { AuthButtonComponent } from './auth/auth-button/auth-button.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ClimaComponent,
    UsuariosComponent,
    AuthButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    provideAuth0({
      domain: environment.domain,
      clientId: environment.clientId,
      authorizationParams: {
        audience: environment.apiId,
        redirect_uri: window.location.origin
      }
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
