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

  constructor(private httpClient: HttpClient, private authService: AuthService) {}


  crearChat(chat: Partial<Chat>): Observable<Chat> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.post<Chat>(`/api/chat/crear`, chat, options);
  }

  getChatById(idUsuario: number): Observable<Chat[]> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Chat[]>(`/api/chat/${idUsuario}`, options);
  }


  getDetallesChat(idChat: number): Observable<Chat> {
    const options = this.authService.getAuthHeaders();
    return this.httpClient.get<Chat>(`/api/chat/detalles/${idChat}`, options);
  }


}
