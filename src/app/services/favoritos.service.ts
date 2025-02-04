import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Favoritos } from '../modelos/Favoritos';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  anadirFavorito(idProducto: number): Observable<Favoritos> {
    const idPerfil = this.authService.getPerfilIdFromToken();
    if (!idPerfil) {
      return throwError('No se pudo obtener el idPerfil del token');
    }
    const options = this.authService.getAuthHeaders();
    const url = `api/perfiles/favoritos/${idPerfil}/${idProducto}`;
    console.log('Request URL:', url);
    console.log('Request Options:', options);
    return this.http.post<Favoritos>(url, {}, options).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server error');
  }
}
