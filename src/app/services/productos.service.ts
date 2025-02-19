import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/Producto';
import { AuthService } from './auth.service';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl:string = environment.apiUrl;

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getProductos(): Observable<Producto[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Producto[]>(`${this.apiUrl}/productos/`, options);
  }

  getProductoByNombre(nombre: string): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Producto>(`${this.apiUrl}/productos/buscar/${nombre}`, options);
  }

  getProductoByCategoria(categoria: string): Observable<Producto[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Producto[]>(`${this.apiUrl}/productos/categoria/${categoria}`, options);
  }

  getProductoById(id: number): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Producto>(`${this.apiUrl}/productos/${id}`, options);
  }

  eliminarProducto(id: number): Observable<void> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.delete<void>(`${this.apiUrl}/productos/eliminar/${id}`, options);
  }

  modificarProducto(id: number, producto: Producto): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<Producto>(`${this.apiUrl}/productos/actualizar/${id}`, producto, options);
  }

  guardarProducto(id: number, producto: Partial<Producto>): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Producto>(`${this.apiUrl}/productos/guardar/${id}`, producto, options);
  }

  getProductosByPerfilId(idPerfil?: number): Observable<Producto[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Producto[]>(`${this.apiUrl}/productos/perfil/${idPerfil}`, options);
  }

}
