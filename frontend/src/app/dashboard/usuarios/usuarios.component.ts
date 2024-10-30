import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private authService: AuthService, private router: Router
  ) { }

  errorMessage: string = ''
  usuarios: any[] = []

  async ngOnInit() {
    this.errorMessage = '';
    this.usuariosService.obtener().subscribe({
      next: (response) => {
        if (response.status) {
          console.log('Lista de Usuarios: ', response);
          this.usuarios = response.datos;
        } else {
          this.errorMessage = 'Error al obtener usuarios';
          this.authService.clearToken();
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Error en la solicitud de obtener usuarios:', err);
        this.errorMessage = 'Error al obtener usuarios. Inténtalo más tarde.';
      }
    });
  }
}
