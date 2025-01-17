import { Component, OnInit } from '@angular/core';
import {PerfilComponent} from "../perfil/perfil.component";
import {MenuInferiorComponent} from "../menu-inferior/menu-inferior.component";
import {InfiniteScrollCustomEvent, IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-panel-perfil',
  templateUrl: './panel-perfil.component.html',
  styleUrls: ['./panel-perfil.component.scss'],
  imports: [
    PerfilComponent,
    MenuInferiorComponent,
    IonicModule
  ],
  standalone: true
})
export class PanelPerfilComponent  implements OnInit {
  items: string[] = [];

  constructor() { }

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
