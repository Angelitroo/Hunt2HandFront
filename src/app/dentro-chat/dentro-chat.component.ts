import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { IonicModule } from "@ionic/angular";
import { DatePipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { PerfilesService } from "../services/perfiles.service";
import { addIcons } from "ionicons";
import { send } from "ionicons/icons";
import { MensajeService } from "../services/mensaje.service";
import { Mensaje } from "../modelos/Mensaje";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Chat } from "../modelos/Chat";
import { ChatService } from "../services/chat.service";

@Component({
  selector: 'app-dentro-chat',
  templateUrl: './dentro-chat.component.html',
  styleUrls: ['./dentro-chat.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    MenuInferiorComponent,
    NgClass,
    FormsModule,
    DatePipe,
    NgForOf,
    NgIf
  ]
})
export class DentroChatComponent implements OnInit {
  idChat: number = 0;
  idEmisor: number = 0;
  idReceptor: number = 0;

  perfiles: { [key: number]: any } = {};
  mensajes: Mensaje[] = [];
  nuevoMensaje: string = '';
  nombreReceptor: string = '';
  imagenReceptor: string = '';
  imagenEmisor: string = '';

  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilesService,
    private mensajeService: MensajeService,
    private authService: AuthService,
    private chatService: ChatService
  ) {
    addIcons({'send': send });
  }

  ngOnInit() {
    this.idEmisor = this.authService.getPerfilIdFromToken() ?? 0;
    this.idChat = +this.route.snapshot.paramMap.get('id_chat')!;

    this.chatService.getDetallesChat(this.idChat).subscribe({
      next: (chat: Chat) => {
        this.idReceptor = chat.id_creador === this.idEmisor ? chat.id_receptor : chat.id_creador;
        this.loadPerfilReceptor(this.idReceptor);
      },
      error: (err) => console.error('Error al obtener el chat:', err)
    });

    this.mensajeService.obtenerMensajesPorChat(this.idChat).subscribe({
      next: (data) => {
        this.mensajes = data;
      },
      error: (err) => console.error('Error al obtener los mensajes:', err)
    });

    this.loadPerfilEmisor(this.idEmisor);
  }

  loadPerfilEmisor(idEmisor: number) {
    if (!this.perfiles[idEmisor]) {
      this.perfilService.getPerfilById(idEmisor).subscribe({
        next: (data) => {
          this.perfiles[idEmisor] = data;
          this.imagenEmisor = data.imagen;
        },
      });
    }
  }

  loadPerfilReceptor(perfilId: number) {
    if (!this.perfiles[perfilId]) {
      this.perfilService.getPerfilById(perfilId).subscribe({
        next: (data) => {
          this.perfiles[perfilId] = data;
          this.nombreReceptor = data.nombre;
          this.imagenReceptor = data.imagen;
        },
      });
    }
  }

  enviarMensaje() {
    if (!this.nuevoMensaje.trim()) return;

    if (!this.idReceptor) {
      console.error('Error: No se puede enviar el mensaje porque idReceptor no está definido.');
      return;
    }

    const mensaje: Mensaje = {
      id: 0,
      idChat: this.idChat,
      idEmisor: this.idEmisor,
      idReceptor: this.idReceptor,
      contenido: this.nuevoMensaje,
      fecha: new Date().toISOString()
    };

    this.mensajeService.enviarMensaje(mensaje).subscribe(
      mensajeEnviado => {
        this.mensajes.push(mensajeEnviado);
        this.nuevoMensaje = '';
      },
      error => console.error('Error enviando mensaje', error)
    );
  }
}
