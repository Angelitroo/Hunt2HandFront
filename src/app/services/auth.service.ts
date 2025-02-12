// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from "rxjs";
import {PerfilesService} from "./perfiles.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  constructor(private httpClient: HttpClient, private perfilesService: PerfilesService) {}

  isAuth(){
    if (this.getToken() != null){
      return true;
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    const id = this.getPerfilIdFromToken();
    const perfil = this.perfilesService.getPerfilById(id);
    if (perfil.perfil.rol == 'ADMIN') {
      return true;
    } else {
      return false;
    }
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
        console.log('Token payload:', payload);
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
