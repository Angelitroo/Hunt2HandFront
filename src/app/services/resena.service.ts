import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Resena} from "../modelos/Resena";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private api = 'https://hunt2hand.onrender.com';

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  crearResena(resena: Resena, idPerfilValorador: number, idPerfilValorado: number): Observable<Resena> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Resena>(`${this.api}/resena/crear/${idPerfilValorador}/${idPerfilValorado}`, resena , options);
  }

  buscarResenaMedia(idPerfilValorado: number): Observable<number> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<number>(`${this.api}/resena/buscar/media/${idPerfilValorado}`, options);
  }

  buscarResena(idPerfilValorador: number, idPerfilValorado: number): Observable<Resena> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Resena>(`${this.api}/resena/buscar/${idPerfilValorador}/${idPerfilValorado}`, options);
  }


}
