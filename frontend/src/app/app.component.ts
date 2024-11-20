import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.handleRedirectCallback().subscribe({
      next: () => console.log('Redirección procesada correctamente.'),
      error: (err) => console.error('Error procesando redirección:', err),
    });
  }

}
