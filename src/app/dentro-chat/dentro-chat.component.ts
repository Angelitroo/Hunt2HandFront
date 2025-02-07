import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { IonicModule } from "@ionic/angular";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import { PerfilesService } from "../services/perfiles.service";
import { addIcons } from "ionicons";
import { send } from "ionicons/icons";
import { MensajeService } from "../services/mensaje.service";
import { Mensaje } from "../modelos/Mensaje";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {interval, Subscription} from "rxjs";

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


  idChat: number = 0;
  idEmisor: number = 0;
  idReceptor: number = 0;

  perfiles: { [key: number]: any } = {};

  mensajes: Mensaje[] = [];
  nuevoMensaje: string = '';

  nombreReceptor: string = '';
  imagenReceptor: string = '';
  imagenEmisor: string = '';



  private chatSubscription!: Subscription

  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilesService,
    private mensajeService: MensajeService,
    private authService: AuthService,

  ) {
    addIcons({'send': send });
  }

  ngOnInit() {
    this.idEmisor = this.authService.getPerfilIdFromToken() ?? 0;
    this.idChat = +this.route.snapshot.paramMap.get('id_chat')!;

    this.mensajeService.obtenerMensajesPorChat(this.idChat).subscribe({
      next: (data) => {
        this.mensajes = data;
        if (this.mensajes.length > 0) {
          // Determinar el idReceptor a partir de los mensajes
          this.idReceptor = this.mensajes[0].idEmisor === this.idEmisor
            ? this.mensajes[0].idReceptor
            : this.mensajes[0].idEmisor;
        }

        if (!this.idReceptor) {
          console.error('Error: idReceptor es 0 o undefined.');
          return;
        }

        this.loadPerfil(this.idReceptor);
        console.log('ID Receptor:', this.idReceptor);
      },
      error: (error) => {
        if (error.status === 404) {
          console.error('Resource not found: ', error.message);
          // Optionally, provide feedback to the user
          alert('The requested chat could not be found.');
        } else {
          console.error('Error fetching messages: ', error);
        }
      }
    });
  }


  loadPerfil(perfilId: number) {
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

  protected readonly sessionStorage = sessionStorage;
}
