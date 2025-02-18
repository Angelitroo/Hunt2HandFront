import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import {IonContent, IonicModule } from "@ionic/angular";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import { PerfilesService } from "../services/perfiles.service";
import { addIcons } from "ionicons";
import {send, star} from "ionicons/icons";
import { MensajeService } from "../services/mensaje.service";
import { Mensaje } from "../modelos/Mensaje";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";
import {ChatService} from "../services/chat.service";
import {ResenaService} from "../services/resena.service";
import { Resena } from "../modelos/Resena";
import {MenuLateralComponent} from "../menu-lateral/menu-lateral.component";

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
        NgIf,
        NgClass,
        MenuLateralComponent
    ]
})
export class DentroChatComponent implements OnInit, OnDestroy {
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  isScreenSmall: boolean = false;

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
    addIcons({'send': send, 'star': star });
  }

  ngOnInit() {
    this.checkScreenSize();
    this.idEmisor = this.authService.getPerfilIdFromToken() ?? 0;
    this.idChat = +this.route.snapshot.paramMap.get('id_chat')!;

    this.chatService.getDetallesChat(this.idChat).subscribe({
      next: (detallesChat) => {
        this.idReceptor = detallesChat.id_receptor;

        if (this.idEmisor === this.idReceptor) {
          // Intercambia los valores si son iguales
          this.idReceptor = detallesChat.id_creador;
        }

        this.loadPerfilReceptor(this.idReceptor);
        this.loadPerfilEmisor(this.idEmisor);
        this.loadMensajes();
        this.verificarSiYaValoro();

        this.intervalId = setInterval(() => {
          this.loadMensajes();
        }, 1000);

      },
      error: (err) => console.error('Error al obtener los detalles del chat:', err)
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadMensajes() {
    this.mensajeService.obtenerMensajesPorChat(this.idChat).subscribe({
      next: (data) => {
        if (data.length > 0) {
          // Verifica que no agregue duplicados
          const existingMessageIds = new Set(this.mensajes.map(m => m.id));
          const newMessages = data.filter(m => !existingMessageIds.has(m.id));

          if (newMessages.length > 0) {
            this.mensajes.push(...newMessages);
            this.lastMessageId = Math.max(...this.mensajes.map(m => m.id));
            this.scrollToBottom();
          }
        }
      },
      error: (err) => {
        if (err.status !== 404) {
          console.error('Error al obtener los mensajes:', err);
        }
      }
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

  loadPerfilEmisor(idEmisor: number) {
    if (!this.perfiles[idEmisor]) {
      this.perfilService.getPerfilById(idEmisor).subscribe({
        next: (data) => {
          this.perfiles[idEmisor] = data;
          this.imagenEmisor = data.imagen;
        },
      });
    }
    console.log("perfil receptor: ", idEmisor);
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
        this.scrollToBottom();
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isScreenSmall = window.innerWidth < 1024;
  }
}
