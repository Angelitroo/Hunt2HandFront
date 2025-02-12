import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private stompClient!: Client;
  private socketUrl = 'http://localhost:8080/ws-chat';

  constructor(private authService: AuthService) {
    this.connect();
  }

  private connect() {
    const token = this.authService.getToken();
    const socket = new SockJS(`${this.socketUrl}?token=${token}`);

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (msg) => console.log(msg),
    });

    this.stompClient.onConnect = () => {
      console.log('✅ Conectado a WebSocket');
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('❌ Error en WebSocket:', error);
    };

    this.stompClient.activate();
  }

  /**
   * ✅ Suscribirse a un chat específico
   */
  suscribirseAlChat(idChat: number, callback: (mensaje: any) => void) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error('❌ No hay conexión con WebSocket');
      return;
    }

    this.stompClient.subscribe(`/topic/chat/${idChat}`, (message: IMessage) => {
      callback(JSON.parse(message.body));
    });
  }

  /**
   * ✅ Enviar mensaje a un chat
   */
  enviarMensaje(idChat: number, mensaje: any) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error('❌ No hay conexión con WebSocket');
      return;
    }

    this.stompClient.publish({
      destination: `/app/chat/${idChat}`,
      body: JSON.stringify(mensaje),
    });
  }
}
