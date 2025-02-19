import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable, of, tap, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Favoritos } from '../modelos/Favoritos';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private api = 'https://hunt2hand.onrender.com';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getFavoritosByPerfil(idPerfil: number): Observable<Favoritos[]> {
    const options = this.authService.getAuthHeaders();
    const url = `${this.api}/perfiles/favoritos/${idPerfil}`;
    return this.http.get<Favoritos[]>(url, options).pipe(
      catchError(this.handleError)
    );
  }

  anadirFavorito(idProducto: number): Observable<Favoritos> {
    const idPerfil = this.authService.getPerfilIdFromToken();
    if (!idPerfil) {
      return throwError('No se pudo obtener el idPerfil del token');
    }
    const options = this.authService.getAuthHeaders();
    const url = `${this.api}/perfiles/favoritos/${idPerfil}/${idProducto}`;
    return this.http.post<Favoritos>(url, {}, options).pipe(
      catchError(this.handleError)
    );
  }

  eliminarFavorito(productoId: number) {
    const idPerfil = this.authService.getPerfilIdFromToken();
    const options = {
      ...this.authService.getAuthHeaders(),
      responseType: 'text' as 'json'
    };

    return this.http.delete(`${this.api}/perfiles/favoritos/eliminar/${idPerfil}/${productoId}`, options)
      .pipe(
        tap(response => {
          console.log('Respuesta de la API:', response);
        }),
        catchError(error => {
          console.error(error);
          return throwError(() => new Error('Error al eliminar de favoritos'));
        })
      );
  }

  esFavorito(idProducto: number): Observable<boolean> {
    const idPerfil = this.authService.getPerfilIdFromToken();
    if (!idPerfil) {
      throw new Error('No se pudo obtener el idPerfil del token');
    }
    const options = this.authService.getAuthHeaders();
    const url = `${this.api}/perfiles/favoritos/comprobar/${idPerfil}/${idProducto}`;
    return this.http.get<boolean>(url, options);
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error.message || 'Server error');
  }
}
