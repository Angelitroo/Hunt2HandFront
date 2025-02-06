import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReseñaServiceService } from '../services/reseña-service.service';
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { IonicModule } from "@ionic/angular";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import { Perfil } from "../modelos/Perfil";
import { PerfilesService } from "../services/perfiles.service";
import { addIcons } from "ionicons";
import { send, star } from "ionicons/icons";
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



    if (!this.idReceptor) {
      console.error('Error: idReceptor es 0 o undefined.');
    }

    this.mensajeService.obtenerMensajesPorChat(this.idChat).subscribe({
      next: (data) => {
        this.mensajes = data;
        this.mensajes.forEach(mensaje => {
          const idReceptor = mensaje.idReceptor === this.idEmisor ? mensaje.idEmisor : mensaje.idEmisor;
          this.loadPerfil(idReceptor);

          console.log('ID Receptor:', idReceptor);
        });
        console.log('ID Emisor:', this.idEmisor);
        console.log('ID Chat:', this.idChat);
      },
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
