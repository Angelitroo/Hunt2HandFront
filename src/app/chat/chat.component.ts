import { Component, OnInit } from '@angular/core';
import {MenuInferiorComponent} from "../menu-inferior/menu-inferior.component";
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {star} from "ionicons/icons";
import {NgClass} from "@angular/common";

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
export class ChatComponent  implements OnInit {
  estrellaSeleccionada: number = 0;


  constructor() {
    addIcons({ star });
  }

  ngOnInit() {}

  pulsada1() {
    this.estrellaSeleccionada = 1;
  }

  pulsada2() {
    this.estrellaSeleccionada = 2;
  }

  pulsada3() {
    this.estrellaSeleccionada = 3;
  }

  pulsada4() {
    this.estrellaSeleccionada = 4;
  }

  pulsada5() {
    this.estrellaSeleccionada = 5;
  }

}
