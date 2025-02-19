import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/Producto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private api = 'https://hunt2hand.onrender.com';

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getProductos(): Observable<Producto[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Producto[]>(`${this.api}/productos/`, options);
  }

  getProductoByNombre(nombre: string): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Producto>(`${this.api}/productos/buscar/${nombre}`, options);
  }

  getProductoByCategoria(categoria: string): Observable<Producto[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Producto[]>(`${this.api}/productos/categoria/${categoria}`, options);
  }

  getProductoById(id: number): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Producto>(`${this.api}/productos/${id}`, options);
  }

  eliminarProducto(id: number): Observable<void> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.delete<void>(`${this.api}/productos/eliminar/${id}`, options);
  }

  modificarProducto(id: number, producto: Producto): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<Producto>(`${this.api}/productos/actualizar/${id}`, producto, options);
  }

  guardarProducto(id: number, producto: Partial<Producto>): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Producto>(`${this.api}/productos/guardar/${id}`, producto, options);
  }

  getProductosByPerfilId(idPerfil?: number): Observable<Producto[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Producto[]>(`${this.api}/productos/perfil/${idPerfil}`, options);
  }

}
