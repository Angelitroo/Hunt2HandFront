import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  constructor() {}

  // Guarda el token en el almacenamiento local
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Recupera el token del almacenamiento local
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Elimina el token (para cerrar sesión)
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Método auxiliar para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Método para obtener los headers de autorización
  getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return { headers };
  }
}
