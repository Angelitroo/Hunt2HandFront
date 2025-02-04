import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Reportes} from '../modelos/Reportes';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getReportes(): Observable<Reportes[]> {
    const options = this.authService.getAuthHeaders();
    console.log('GET /api/reportes', options);
    return this.httpClient.get<Reportes[]>('/api/reportes/', options);
  }

  getReporteByNombre(nombre: string): Observable<Reportes> {
    const options = this.authService.getAuthHeaders();
    console.log(`GET /api/reportes/buscar/${nombre}`, options);
    return this.httpClient.get<Reportes>(`/api/reportes/buscar/${nombre}`, options);
  }
}
