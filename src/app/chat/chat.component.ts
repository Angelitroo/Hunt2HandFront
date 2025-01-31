import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import {Chat} from "../modelos/Chat";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {MenuInferiorComponent} from "../menu-inferior/menu-inferior.component";
import {addIcons} from "ionicons";
import {chatbubbleOutline} from "ionicons/icons";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, IonicModule, MenuInferiorComponent, RouterModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})

export class ChatComponent implements OnInit {
  idUsuario!: number;
  chats: Chat[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private chatService: ChatService
  ) {
    addIcons({
      'chatbubble-outline': chatbubbleOutline,
    })
  }

  ngOnInit() {
    this.idUsuario = this.authService.getPerfilIdFromToken() ?? 0;
    this.cargarChats();
  }

  cargarChats() {
    this.chatService.getChatById(this.idUsuario).subscribe(
      (chats) => {
        this.chats = chats;
      },
      (error) => {
        console.error('Error cargando los chats:', error);
      }
    );
  }

}
