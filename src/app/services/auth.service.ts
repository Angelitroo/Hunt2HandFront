// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  private authState = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  authState$ = this.authState.asObservable();

  constructor(private httpClient: HttpClient, private route: Router) {}

  setAuthState(isAuthenticated: boolean): void {
    this.authState.next(isAuthenticated);
  }

  isAuth(){
    if ('' != localStorage.getItem('authToken') || '') {
      return true;
    } else {
      return false;
    }
  }

  esAdmin(): boolean {
    return true;
  }

  cerrarSesion(){
    localStorage.removeItem('authToken');
    this.route.navigate(['/inicio-sesion']);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return { headers };
  }

  getPerfilIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.tokenDataDTO?.id || null;
      } catch (e) {
        console.error(e);
        return null;
      }
    }
    return null;
  }

  recuperarContrasena(email: string): Observable<any> {
    const options = this.getAuthHeaders();
    return this.httpClient.post(`api/auth/recuperar-contrasena`, { email }, options);
  }

  restablecerContrasena(token: string, newPassword: string): Observable<any> {
    const options = this.getAuthHeaders();
    return this.httpClient.post(`api/auth/restablecer-contrasena`, { token, newPassword }, options);
  }
}
