import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {Reporte} from "../modelos/Reporte";

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getReportes(): Observable<Reporte[]> {
    const options = this.authService.getAuthHeaders();
    console.log('GET /api/reporte', options);
    return this.httpClient.get<Reporte[]>('/api/reporte/', options);
  }

  getReporteByNombre(nombre: string): Observable<Reporte> {
    const options = this.authService.getAuthHeaders();
    console.log(`GET /api/reporte/buscar/${nombre}`, options);
    return this.httpClient.get<Reporte>(`/api/reporte/buscar/${nombre}`, options);
  }

  crearReporte(reporte: { fecha: Date; motivo: string }, idReportador: number, idReportado: number): Observable<any> {
    const options = this.authService.getAuthHeaders();
    console.log('POST /api/reporte/crear', reporte, idReportador, idReportado, options);
    return this.httpClient.post<Reporte>(`/api/reporte/crear/${idReportador}/${idReportado}`, reporte, options);
  }

  buscarReporte(idReportador: number, idReportado: number): Observable<Reporte>{
    const options = this.authService.getAuthHeaders();
    console.log(`GET /api/reporte/buscar/${idReportador}/${idReportado}`, options);
    return this.httpClient.get<Reporte>(`/api/reporte/buscar/${idReportador}/${idReportado}`, options);
  }
}
