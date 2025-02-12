import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Resena} from "../modelos/Resena";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ResenaService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  crearResena(resena: Resena, idPerfilValorador: number, idPerfilValorado: number): Observable<Resena> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Resena>(`/api/resena/crear/${idPerfilValorador}/${idPerfilValorado}`, resena , options);
  }

  buscarResenaMedia(idPerfilValorado: number): Observable<Resena> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Resena>(`/api/resena/buscar/media/${idPerfilValorado}`);
  }

  buscarResena(idPerfilValorador: number, idPerfilValorado: number): Observable<Resena> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Resena>(`/api/resena/buscar/${idPerfilValorador}/${idPerfilValorado}`, options);
  }


}
