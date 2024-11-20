import { Component, OnInit } from '@angular/core';
import { AuthService as Auth0 } from '@auth0/auth0-angular';
import { AuthService as LocalAuth } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private localAuth: LocalAuth, public auth0: Auth0, private router: Router) { }

  ngOnInit() {
    this.seleccionar('btn-1')
  }

  dropdownVisible = false

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible
  }

  async logOut() {

    const fuente = this.localAuth.getAuthSource()

    this.localAuth.clearToken()
    if (fuente === 'auth0') {
      this.auth0.logout({ logoutParams: { returnTo: document.location.origin } })
      return;
    }
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