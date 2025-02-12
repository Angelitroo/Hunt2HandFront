import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { Chat } from "../modelos/Chat";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { addIcons } from "ionicons";
import { chatbubbleOutline } from "ionicons/icons";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';
import {PerfilesService} from "../services/perfiles.service";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, IonicModule, MenuInferiorComponent, RouterModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})

export class ChatComponent implements OnInit {
  idUsuario!: number;
  perfiles: { [key: number]: any } = {};
  chats: Chat[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private chatService: ChatService,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService,
    private perfilService: PerfilesService,
    private router: Router
  ) {
    addIcons({
      'chatbubble-outline': chatbubbleOutline,
    })
  }

  ngOnInit() {
    this.idUsuario = this.authService.getPerfilIdFromToken() ?? 0;
    this.chatService.getChatById(this.idUsuario).subscribe({
      next: (data) => {
        this.chats = data;
        this.chats.forEach(chat => {
          const perfilId = chat.id_creador === this.idUsuario ? chat.id_receptor : chat.id_creador;
          this.loadPerfil(perfilId);
          console.log("perfil receptor: ", perfilId);
        });
      },
    });
  }

  loadPerfil(perfilId: number) {
    if (!this.perfiles[perfilId]) {
      this.perfilService.getPerfilById(perfilId).subscribe({
        next: (data) => {
          this.perfiles[perfilId] = data;
        },
      });
    }
  }

  cargarChat(idChat: number) {
    this.router.navigate(['/dentro-chat', idChat]);
  }
}
