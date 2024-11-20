import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as Auth0 } from '@auth0/auth0-angular';
import { AuthService as LocalAuth } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
})
export class AuthButtonComponent implements OnInit {

  constructor(public auth0: Auth0, private localAuth: LocalAuth, private router: Router) { }

  ngOnInit() {

    this.auth0.isAuthenticated$.subscribe((isAuthenticated) => {
      console.log('¿Usuario autenticado?:', isAuthenticated);
      if (isAuthenticated) {
        this.auth0.getAccessTokenSilently().subscribe(
          (token) => {
            this.localAuth.setToken(token);
            this.localAuth.setAuthSource('auth0');
            this.router.navigate(['/dashboard']);
          },
          (err) => console.error('Error al obtener el token:', err)
        );
      }
    })
  }

  loginRedirect() {
    this.auth0.loginWithRedirect()
  }
}