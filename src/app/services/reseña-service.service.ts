import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Reseña} from "../modelos/Reseña";

@Injectable({
  providedIn: 'root'
})
export class ReseñaServiceService {

  constructor(private httpClient: HttpClient) {}

  crearReseña(reseña: Reseña, idPerfilValorador: number, idPerfilValorado: number): Observable<Reseña> {
    return this.httpClient.post<Reseña>(`/api/reseña/crear/${idPerfilValorador}/${idPerfilValorado}`, reseña);
  }
}
