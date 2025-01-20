import { Component, OnInit } from '@angular/core';
import {InfiniteScrollCustomEvent, IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {settings, heartOutline} from "ionicons/icons";
import {MenuInferiorComponent} from "../menu-inferior/menu-inferior.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [
    IonicModule,
    MenuInferiorComponent,
    RouterLink,
  ],
  standalone: true
})
export class PerfilComponent  implements OnInit {
  items: string[] = [];

  constructor() {
    addIcons({
      'settings': settings,
      'heartOutline': heartOutline
    })
  }

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
