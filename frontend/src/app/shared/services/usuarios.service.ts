import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }

  obtener(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const httpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<any>(environment.backendUrl + '/usuarios', { headers: httpHeaders })
  }
}
