import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../modelos/Perfil';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  constructor(private httpClient: HttpClient, private authService:AuthService) {}

  getPerfiles(): Observable<Perfil[]> {
    const options = this.authService.getAuthHeaders();
    console.log('GET /api/perfiles', options);
    return this.httpClient.get<Perfil[]>('api/perfiles/', options);
  }

  getPerfilByUsername(username: string): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil>(`/perfiles/buscar/${username}`, options);
  }

  eliminarPerfil(id: number): Observable<void> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.delete<void>(`/perfiles/${id}`, options);
  }

  modificarPerfil(id: number, perfil: Perfil): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<Perfil>(`/perfiles/${id}`, perfil, options);
  }

  crearPerfil(perfil: Perfil): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Perfil>('/perfiles/', perfil, options);
  }
}
