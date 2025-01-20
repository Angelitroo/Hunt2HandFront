import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {home, heart, pricetag, chatbubbles, person} from "ionicons/icons";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu-inferior',
  templateUrl: './menu-inferior.component.html',
  styleUrls: ['./menu-inferior.component.scss'],
  imports: [
    IonicModule,
    RouterLink
  ],
  standalone: true
})
export class MenuInferiorComponent  implements OnInit {

  constructor() {
    addIcons({
      'home': home,
      'heart': heart,
      'pricetag': pricetag,
      'chatbubbles': chatbubbles,
      'person': person
    });
  }

  ngOnInit() {}

}
