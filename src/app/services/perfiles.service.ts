import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../modelos/Perfil';
import { AuthService } from './auth.service';
import {PerfilActualizar} from "../modelos/PerfilActualizar";
import { SeguirDTO } from '../modelos/SeguirDTO';
import { BanearPerfil } from '../modelos/BanearPerfil';
import { DesbanearPerfil } from '../modelos/DesbanearPerfil';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private authService:AuthService) {}

  getPerfiles(): Observable<Perfil[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil[]>(`${this.apiUrl}/perfiles/`, options);
  }
  getUsuarioById(id: number): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil>(`${this.apiUrl}/usuarios/${id}`, options);
  }

  getPerfilByUsername(username: string): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil>(`${this.apiUrl}/perfiles/buscar/${username}`, options);
  }

  getPerfilById(id: number): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil>(`${this.apiUrl}/perfiles/${id}`, options);
  }

  eliminarPerfil(id: number): Observable<void> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/perfiles/eliminar/${id}`, options);
  }

  banearPerfil(banearPerfil: BanearPerfil): Observable<void> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<void>(`${this.apiUrl}/perfiles/banear`, banearPerfil, options);
  }

  desbanearPerfil(desbanearPerfil: DesbanearPerfil): Observable<void> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<void>(`${this.apiUrl}/perfiles/desbanear`, desbanearPerfil, options);
  }

  modificarPerfil(id: number, perfil: Perfil): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<Perfil>(`${this.apiUrl}/perfiles/${id}`, perfil, options);
  }

  getPerfilActualizadoById(id: number): Observable<PerfilActualizar> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<PerfilActualizar>(`${this.apiUrl}/perfiles/actualizado/${id}`, options);
  }

  actualizar(id: number, perfilActualizar: Partial<PerfilActualizar>): Observable<PerfilActualizar> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<PerfilActualizar>(`${this.apiUrl}/perfiles/actualizar/${id}`, perfilActualizar, options);
  }

  crearPerfil(perfil: Perfil): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Perfil>(`${this.apiUrl}/perfiles/`, perfil, options);
  }

  seguirPerfil(seguirDTO: SeguirDTO): Observable<Perfil> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Perfil>(`${this.apiUrl}/perfiles/seguir`, seguirDTO, options);
  }

  dejarDeSeguirPerfil(seguirDTO: SeguirDTO): Observable<string> {
    const options = {
      ...this.authService.getAuthHeaders(),
      responseType: 'text' as 'json'
    }
    return this.httpClient.post<string>(`${this.apiUrl}/perfiles/dejar-seguir`, seguirDTO, options);
  }

  esSeguidor(seguirDTO: SeguirDTO): Observable<boolean> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<boolean>(`${this.apiUrl}/perfiles/es-seguidor`, seguirDTO, options);
  }

  getSeguidores(id: number): Observable<Perfil[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil[]>(`${this.apiUrl}/perfiles/seguidores/${id}`, options);
  }

  getSeguidos(id: number): Observable<Perfil[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil[]>(`${this.apiUrl}/perfiles/seguidos/${id}`, options);
  }

  buscarPorNombre(nombre: string): Observable<Perfil[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Perfil[]>(`${this.apiUrl}/perfiles/buscar/${nombre}`, options);
  }
}
