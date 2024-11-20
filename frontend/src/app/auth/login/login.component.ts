import { Component, OnInit } from '@angular/core';
import { AuthService as LocalAuth } from 'src/app/shared/services/auth.service';
import { AuthService as Auth0 } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private localAuth: LocalAuth,
    private auth0: Auth0,
    private router: Router) { }

  ngOnInit(): void {

    if (this.localAuth.getToken() != '') this.router.navigate(['/dashboard']);
  }

  async login() {
    this.errorMessage = '';
    console.log("Se presionó el boton de login")
    this.localAuth.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        if (response.status) {
          console.log('Inicio de sesión exitoso:', response);
          if (response.token) {
            this.localAuth.setToken(response.token)
            this.localAuth.setAuthSource('local')
            this.router.navigate(['/dashboard']);
          }
        } else {
          this.errorMessage = response.mensaje;
        }
      },
      error: (err) => {
        console.error('Error en la solicitud de login:', err);
        this.errorMessage = 'Error al iniciar sesión. Inténtalo más tarde.';
      }
    });
  }
}


