import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {

    this.loginStatus.next(this.tokenExist())
  }

  register(nuevoUsuario: any): Observable<LoginResponse> {
    console.log(nuevoUsuario)
    return this.httpClient.post<LoginResponse>(environment.backendUrl + '/register', nuevoUsuario)
  }

  login(credenciales: any): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(environment.backendUrl + '/login', credenciales);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  tokenExist(): boolean {
    return !!this.getToken() ? true : false;
  }
}