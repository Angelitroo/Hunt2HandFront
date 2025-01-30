import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../modelos/Producto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getProductos(): Observable<Producto[]> {
    const options = this.authService.getAuthHeaders();
    console.log('GET /api/productos', options);
    return this.httpClient.get<Producto[]>('/api/productos/', options);
  }

  getProductoByNombre(nombre: string): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    console.log(`GET /api/productos/buscar/${nombre}`, options);
    return this.httpClient.get<Producto>(`/api/productos/buscar/${nombre}`, options);
  }

  getProductoById(id: number): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    console.log(`GET /api/productos/${id}`, options);
    return this.httpClient.get<Producto>(`/api/productos/${id}`, options);
  }

  eliminarProducto(id: number): Observable<void> {
    const options = this.authService.getAuthHeaders();
    console.log(`DELETE /api/productos/${id}`, options);
    return this.httpClient.delete<void>(`/api/productos/${id}`, options);
  }

  modificarProducto(id: number, producto: Producto): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    console.log(`PUT /api/productos/${id}`, producto, options);
    return this.httpClient.put<Producto>(`/api/productos/${id}`, producto, options);
  }

  guardarProducto(id: number, producto: Partial<Producto>): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    console.log('POST /api/productos', producto, options);
    return this.httpClient.post<Producto>(`/api/productos/guardar/${id}`, producto, options);
  }

}
