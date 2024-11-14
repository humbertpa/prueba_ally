import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.seleccionar('btn-1')
    
  }

  dropdownVisible = false

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible
  }

  async logOut() {
    this.authService.clearToken()
    window.location.reload()
  }

  seleccionar(boton: string) {
    const clima = document.getElementById('btn-1');
    const usuarios = document.getElementById('btn-2');
    if (clima && usuarios) {
      if (boton == 'btn-1') {
        clima.style.color = '#0160f1';
        clima.style.fontWeight = 'bold';
        usuarios.style.color = '#ccc';
        usuarios.style.fontWeight = 'normal';
      } else {
        usuarios.style.color = '#0160f1';
        usuarios.style.fontWeight = 'bold';
        clima.style.color = '#ccc';
        clima.style.fontWeight = 'normal';
      }
    }
  }
}