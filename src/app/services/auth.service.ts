import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  constructor() {}

  // Save token in the browser
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Retrieve token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Remove token
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Get headers
  getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return { headers };
  }
}
