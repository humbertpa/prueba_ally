import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  dropdownVisible = false

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible
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
