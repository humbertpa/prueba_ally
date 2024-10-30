import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) { }

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
        }
      },
      error: (err) => {
        console.error('Error en la solicitud de obtener usuarios:', err);
        this.errorMessage = 'Error al obtener usuarios. Inténtalo más tarde.';
      }
    });
  }
}
