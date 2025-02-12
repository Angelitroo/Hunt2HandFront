import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import {IonContent, IonicModule } from "@ionic/angular";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { PerfilesService } from "../services/perfiles.service";
import { addIcons } from "ionicons";
import { send } from "ionicons/icons";
import { MensajeService } from "../services/mensaje.service";
import { Mensaje } from "../modelos/Mensaje";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";
import {ChatService} from "../services/chat.service";
import {ResenaService} from "../services/resena.service";
import { Resena } from "../modelos/Resena";

@Component({
  selector: 'app-dentro-chat',
  templateUrl: './dentro-chat.component.html',
  styleUrls: ['./dentro-chat.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    MenuInferiorComponent,
    FormsModule,
    DatePipe,
    NgForOf,
    NgIf
  ]
})
export class DentroChatComponent implements OnInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  idChat: number = 0;
  idEmisor: number = 0;
  idReceptor: number = 0;

  estrellaSeleccionada: number = 0;
  estrellasSeleccionadas: { [key: number]: boolean } = {
    1: false, 2: false, 3: false, 4: false, 5: false
  };
  yaValorado: boolean = false;

  perfiles: { [key: number]: any } = {};

  mensajes: Mensaje[] = [];
  nuevoMensaje: string = '';
  nombreReceptor: string = '';
  apellidoReceptor: string = '';
  imagenReceptor: string = '';
  imagenEmisor: string = '';
  private intervalId!: any;
  private lastMessageId: number = 0;



  private chatSubscription!: Subscription

  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilesService,
    private mensajeService: MensajeService,
    private authService: AuthService,
    private chatService: ChatService,
    private resenaService: ResenaService
  ) {
    addIcons({'send': send });
  }

  ngOnInit() {
    this.idEmisor = this.authService.getPerfilIdFromToken() ?? 0;
    this.idChat = +this.route.snapshot.paramMap.get('id_chat')!;

    this.chatService.getDetallesChat(this.idChat).subscribe({
      next: (detallesChat) => {
        this.idReceptor = detallesChat.id_receptor;
        this.loadPerfilReceptor(this.idReceptor);
        this.loadPerfilEmisor(this.idEmisor);
        this.loadMensajes();

        this.intervalId = setInterval(() => {
          this.loadMensajes();
        }, 10);

      },
      error: (err) => console.error('Error al obtener los detalles del chat:', err)
    });
  }

  loadMensajes() {
    this.mensajeService.obtenerMensajesPorChat(this.idChat).subscribe({
      next: (data) => {
        if (data.length > 0) {
          const newMessages = data.filter(mensaje => mensaje.id > this.lastMessageId);
          if (newMessages.length > 0) {
            this.mensajes.push(...newMessages);
            this.lastMessageId = newMessages[newMessages.length - 1].id;
            this.scrollToBottom();
          }
        }
      },
      error: (err) => console.error('Error al obtener los mensajes:', err)
    });
  }

  loadPerfilReceptor(perfilId: number) {
    if (!this.perfiles[perfilId]) {
      this.perfilService.getPerfilById(perfilId).subscribe({
        next: (data) => {
          this.perfiles[perfilId] = data;
          this.nombreReceptor = data.nombre;
          this.apellidoReceptor = data.apellido;
          this.imagenReceptor = data.imagen;
        },
        error: (err) => console.error('Error al obtener el perfil del receptor:', err)
      });
    }
  }

  loadPerfilEmisor(idEmidor: number) {
    if (!this.perfiles[idEmidor]) {
      this.perfilService.getPerfilById(idEmidor).subscribe({
        next: (data) => {
          this.perfiles[idEmidor] = data;
          this.imagenEmisor = data.imagen;
        },
      });
    }
    console.log("perfil receptor: ", perfilId);
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

  verificarSiYaValoro() {
    this.resenaService.buscarResena(this.idEmisor, this.idReceptor).subscribe({
      next: (data) => {
        console.log('Respuesta de buscarResena:', data);
        if (data.id_perfilvalorador === this.idEmisor && data.id_perfilvalorado === this.idReceptor) {
          this.yaValorado = true;
          this.establecerEstrellasSeleccionadas(data.valoracion);
        }
        else {
          console.log('No ha valorado aún.');
          this.yaValorado = false;
          this.estrellaSeleccionada = 0;
          this.establecerEstrellasSeleccionadas(0);
        }
      },
      error: (err) => {
        console.error('No existe ninguna reseña con:', 'Emisor:', this.idEmisor, 'Receptor', this.idReceptor, err);
        this.yaValorado = false;
        this.estrellaSeleccionada = 0;
        this.establecerEstrellasSeleccionadas(0);
      }
    });
  }


  abrirValoracion(numero: number) {
    if (this.yaValorado) return;

    const confirmacion = confirm(`¿Valorar con ${numero} estrella${numero > 1 ? 's' : ''}?`);
    if (confirmacion) {
      this.estrellaSeleccionada = numero;
      this.establecerEstrellasSeleccionadas(numero);
      this.confirmarValoracion();
      this.yaValorado = true;
    }
  }
  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 100);
  }

  establecerEstrellasSeleccionadas(numero: number) {
    for (let i = 1; i <= 5; i++) {
      this.estrellasSeleccionadas[i] = i <= numero;
    }
  }

  confirmarValoracion() {
    const nuevaResena = {
      id: 0,
      valoracion: this.estrellaSeleccionada,
      id_perfilvalorado: this.idReceptor,
      id_perfilvalorador: this.idEmisor
    };
    this.resenaService.crearResena(nuevaResena, this.idEmisor, this.idReceptor)
      .subscribe(() => {
        console.log(`Valoración confirmada: ${this.estrellaSeleccionada} estrella(s)` );
        this.yaValorado = true;
      });
  }
}
