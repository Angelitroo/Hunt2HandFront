import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Mensaje } from '../modelos/Mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  private baseUrl = '/api/mensajes';

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  enviarMensaje(mensaje: Mensaje): Observable<Mensaje> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Mensaje>(`${this.baseUrl}/enviar`, mensaje, options);
  }

  obtenerMensajesPorChat(idChat: number): Observable<Mensaje[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Mensaje[]>(`${this.baseUrl}/chat/${idChat}`, options);
  }

  obtenerMensajesEnviados(idUsuario: number): Observable<Mensaje[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Mensaje[]>(`${this.baseUrl}/enviados/${idUsuario}`, options);
  }

  obtenerMensajesRecibidos(idUsuario: number): Observable<Mensaje[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Mensaje[]>(`${this.baseUrl}/recibidos/${idUsuario}`, options);
  }
}
