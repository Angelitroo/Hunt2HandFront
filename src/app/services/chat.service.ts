import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producto} from "../modelos/Producto";
import {AuthService} from "./auth.service";
import {Chat} from "../modelos/Chat";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private api = 'https://hunt2hand.onrender.com';

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  crearChat(chat: Partial<Chat>): Observable<Chat> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Chat>(`${this.api}/chat/crear`, chat, options);
  }

  getChatById(idUsuario: number): Observable<Chat[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Chat[]>(`${this.api}/chat/${idUsuario}`, options);
  }

  getDetallesChat(idChat: number): Observable<Chat> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Chat>(`${this.api}/chat/detalles/${idChat}`, options);
  }

  obtenerReceptorPorChat(idChat: number): Observable<number> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<number>(`${this.api}/chat/receptor/${idChat}`, options);
  }


}
