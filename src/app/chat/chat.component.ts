import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReseñaServiceService } from '../services/reseña-service.service';
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { IonicModule } from "@ionic/angular";
import { NgClass } from "@angular/common";
import { Perfil } from "../modelos/Perfil";
import { PerfilesService } from "../services/perfiles.service";
import { addIcons } from "ionicons";
import { chatbubbleOutline } from "ionicons/icons";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    MenuInferiorComponent,
    IonicModule,
    NgClass,
    FormsModule
  ]
})
export class ChatComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private reseñaService: ReseñaServiceService,
    private perfilService: PerfilesService
  ) {
    addIcons({
      'chatbubble-outline': chatbubbleOutline,
    });
  }

  ngOnInit() {
  }
}
