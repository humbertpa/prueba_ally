import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  errorMessage: string = '';
  noMatch = false;

  ngOnInit(): void {
    if (this.authService.getToken() != '') this.router.navigate(['/dashboard']);
  }

  async register(nuevo_usuario: NgForm) {
    console.log('nuevo intento')
    this.noMatch = false
    this.errorMessage = '';

    const formulario = nuevo_usuario.value;
    console.log(formulario)

    if (formulario.password != formulario.confirm_password) {
      this.noMatch = true
      return
    }

    console.log(nuevo_usuario.value)
    this.authService.register(nuevo_usuario.value).subscribe({
      next: (response) => {
        if (response.status) {
          console.log('Usuario creado correctamente:', response);
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
        this.errorMessage = 'Error al registrar usuario. Inténtalo más tarde.';
      }
    });
  }
}
