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
    return this.httpClient.get<Perfil>(`api/perfiles/buscar/${username}`, options);
  }

  getPerfilById(id: number): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    console.log(`GET /api/perfiles/${id}`, options);
    return this.httpClient.get<Perfil>(`/api/perfiles/${id}`, options);
  }

  eliminarPerfil(id: number): Observable<void> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.delete<void>(`api/perfiles/${id}`, options);
  }

  modificarPerfil(id: number, perfil: Perfil): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<Perfil>(`api/perfiles/${id}`, perfil, options);
  }

  crearPerfil(perfil: Perfil): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Perfil>('api/perfiles/', perfil, options);
  }

  getSeguidores(id: number): Observable<Perfil[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil[]>(`api/perfiles/seguidores/${id}`, options);
  }

  getSeguidos(id: number): Observable<Perfil[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil[]>(`api/perfiles/seguidos/${id}`, options);
  }

  buscarPorNombre(nombre: string): Observable<Perfil[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil[]>(`/api/perfiles/buscar/${nombre}`, options);
  }
}
