import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producto} from "../modelos/Producto";
import {AuthService} from "./auth.service";
import {Chat} from "../modelos/Chat";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl:string = environment.apiUrl;
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  crearChat(chat: Partial<Chat>): Observable<Chat> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Chat>(`${this.apiUrl}/chat/crear`, chat, options);
  }

  getChatById(idUsuario: number): Observable<Chat[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Chat[]>(`${this.apiUrl}/chat/${idUsuario}`, options);
  }

  getDetallesChat(idChat: number): Observable<Chat> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Chat>(`${this.apiUrl}/chat/detalles/${idChat}`, options);
  }

  obtenerReceptorPorChat(idChat: number): Observable<number> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<number>(`${this.apiUrl}/chat/receptor/${idChat}`, options);
  }


}
