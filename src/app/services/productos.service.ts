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
    return this.httpClient.get<Producto[]>('/api/productos', options);
  }

  getProductoById(id: number): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Producto>(`/api/productos/${id}`, options);
  }

  eliminarProducto(id: number): Observable<void> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.delete<void>(`/api/productos/${id}`, options);
  }

  modificarProducto(id: number, producto: Producto): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.put<Producto>(`/api/productos/${id}`, producto, options);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Producto>('/api/productos', producto, options);
  }
}
