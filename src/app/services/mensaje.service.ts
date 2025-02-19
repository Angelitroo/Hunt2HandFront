import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { AuthService } from './auth.service';
import { Mensaje } from '../modelos/Mensaje';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private api = 'https://hunt2hand.onrender.com';

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  enviarMensaje(mensaje: Mensaje): Observable<Mensaje> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Mensaje>(`${this.api}/mensaje/enviar`, mensaje, options);
  }

  obtenerMensajesPorChat(idChat: number): Observable<Mensaje[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Mensaje[]>(`${this.api}/mensaje/chat/${idChat}`, options).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          return of([]);
        } else {
          console.error('Error al obtener los mensajes:', err);
          return of([]);
        }
      })
    );
  }

  obtenerMensajesEnviados(idUsuario: number): Observable<Mensaje[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Mensaje[]>(`${this.api}/mensaje/enviados/${idUsuario}`, options);
  }

  obtenerMensajesRecibidos(idUsuario: number): Observable<Mensaje[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Mensaje[]>(`${this.api}/mensaje/recibidos/${idUsuario}`, options);
  }
}
