import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReseñaServiceService } from '../services/reseña-service.service';
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { IonicModule } from "@ionic/angular";
import { NgClass } from "@angular/common";
import { Perfil } from "../modelos/Perfil";
import { PerfilesService } from "../services/perfiles.service";
import { addIcons } from "ionicons";
import { star } from "ionicons/icons";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    MenuInferiorComponent,
    IonicModule,
    NgClass
  ]
})
export class ChatComponent implements OnInit {


  constructor(
  ) {

  }

  ngOnInit() {
      }



}
