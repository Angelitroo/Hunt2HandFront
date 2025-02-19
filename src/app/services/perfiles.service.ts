import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../modelos/Perfil';
import { AuthService } from './auth.service';
import {PerfilActualizar} from "../modelos/PerfilActualizar";
import { SeguirDTO } from '../modelos/SeguirDTO';
import { BanearPerfil } from '../modelos/BanearPerfil';
import { DesbanearPerfil } from '../modelos/DesbanearPerfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {
  constructor(private httpClient: HttpClient, private authService:AuthService) {}

  getPerfiles(): Observable<Perfil[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil[]>(`/api/perfiles/`, options);
  }
  getUsuarioById(id: number): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil>(`/api/usuarios/${id}`, options);
  }

  getPerfilByUsername(username: string): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil>(`/api/perfiles/buscar/${username}`, options);
  }

  getPerfilById(id: number): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil>(`/api/perfiles/${id}`, options);
  }

  eliminarPerfil(id: number): Observable<void> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.delete<void>(`/api/perfiles/eliminar/${id}`, options);
  }

  banearPerfil(banearPerfil: BanearPerfil): Observable<void> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<void>(`/api/perfiles/banear`, banearPerfil, options);
  }

  desbanearPerfil(desbanearPerfil: DesbanearPerfil): Observable<void> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<void>(`/api/perfiles/desbanear`, desbanearPerfil, options);
  }

  modificarPerfil(id: number, perfil: Perfil): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<Perfil>(`/api/perfiles/${id}`, perfil, options);
  }

  getPerfilActualizadoById(id: number): Observable<PerfilActualizar> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<PerfilActualizar>(`/api/perfiles/actualizado/${id}`, options);
  }

  actualizar(id: number, perfilActualizar: Partial<PerfilActualizar>): Observable<PerfilActualizar> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<PerfilActualizar>(`/api/perfiles/actualizar/${id}`, perfilActualizar, options);
  }

  crearPerfil(perfil: Perfil): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Perfil>(`/api/perfiles/`, perfil, options);
  }

  seguirPerfil(seguirDTO: SeguirDTO): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Perfil>(`/api/perfiles/seguir`, seguirDTO, options);
  }

  dejarDeSeguirPerfil(seguirDTO: SeguirDTO): Observable<string> {
    const options = {
      ...this.authService.getAuthHeaders(),
      responseType: 'text' as 'json'
    }
    return this.httpClient.post<string>(`/api/perfiles/dejar-seguir`, seguirDTO, options);
  }

  esSeguidor(seguirDTO: SeguirDTO): Observable<boolean> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<boolean>(`/api/perfiles/es-seguidor`, seguirDTO, options);
  }

  getSeguidores(id: number): Observable<Perfil[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil[]>(`/api/perfiles/seguidores/${id}`, options);
  }

  getSeguidos(id: number): Observable<Perfil[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil[]>(`/api/perfiles/seguidos/${id}`, options);
  }

  buscarPorNombre(nombre: string): Observable<Perfil[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil[]>(`/api/perfiles/buscar/${nombre}`, options);
  }
}
