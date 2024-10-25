import { Component } from '@angular/core';
/* import { AuthService } from '../../services/auth/auth.service'; */
import { Router } from '@angular/router';

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
    /*     private authService: AuthService, */
    private router: Router) { }

  ngOnInit(): void {
    /* console.log(this.authService.getUser())
    this.authService.getUser().subscribe(user => {
      if (user) {
        console.log(user)
        this.router.navigate(['/dashboard']); // Redirige a Dashboard si el usuario ya está autenticado
      }
    }); */
  }

  // Método para manejar el login
  async login() {
    /*  this.errorMessage = '';
     const result = await this.authService.login(this.email, this.password);
     if (result) {
       this.errorMessage = result; // Mostrar el mensaje de error
     }
   } */
  }
}
