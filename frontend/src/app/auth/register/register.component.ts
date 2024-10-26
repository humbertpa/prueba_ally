import { Component } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/auth';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
/* import { AuthService } from '../../services/auth/auth.service'; */
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    /*  private authService: AuthService, */
    private router: Router) { }

  errorMessage: string = '';

  ngOnInit(): void {
    /*     this.authService.getUser().subscribe(user => {
          if (user) {
            this.router.navigate(['/dashboard']); // Redirige a Dashboard si el usuario ya está autenticado
          }
        }); */
  }

  async register(nuevo_usuario: NgForm) {

    /*     this.errorMessage = ''; // Limpiar mensaje de error antes de intentar registrar
        const result = await this.authService.register(nuevo_usuario.value);
        if (result) {
          this.errorMessage = result; // Mostrar el mensaje de error
        } */
  }

}
