import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Resena} from "../modelos/Resena";
import {AuthService} from "./auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
private apiUrl:string = environment.apiUrl;


  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  crearResena(resena: Resena, idPerfilValorador: number, idPerfilValorado: number): Observable<Resena> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Resena>(`${this.apiUrl}/resena/crear/${idPerfilValorador}/${idPerfilValorado}`, resena , options);
  }

  buscarResenaMedia(idPerfilValorado: number): Observable<number> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<number>(`${this.apiUrl}/resena/buscar/media/${idPerfilValorado}`, options);
  }

  buscarResena(idPerfilValorador: number, idPerfilValorado: number): Observable<Resena> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Resena>(`${this.apiUrl}/resena/buscar/${idPerfilValorador}/${idPerfilValorado}`, options);
  }


}
