import { Component } from '@angular/core';
/* import { AuthService } from '../../services/auth/auth.service'; */
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getToken() != '') this.router.navigate(['/dashboard']);
  }

  // Método para manejar el login
  async login() {
    this.errorMessage = '';
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        if (response.status) {
          console.log('Inicio de sesión exitoso:', response);
          if (response.token) {
            this.authService.setToken(response.token)
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


