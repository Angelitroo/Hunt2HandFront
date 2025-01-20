import { Component, OnInit } from '@angular/core';
import {InfiniteScrollCustomEvent, IonicModule} from "@ionic/angular";
import {BuscadorMenuComponent} from "../buscador-menu/buscador-menu.component";
import {PanelAdminComponent} from "../panel-admin/panel-admin.component";
import {MenuInferiorAdminComponent} from "../menu-inferior-admin/menu-inferior-admin.component";

@Component({
  selector: 'app-panel-admin-perfiles',
  templateUrl: './panel-admin-perfiles.component.html',
  styleUrls: ['./panel-admin-perfiles.component.scss'],
  imports: [
    IonicModule,
    BuscadorMenuComponent,
    PanelAdminComponent,
    MenuInferiorAdminComponent
  ],
  standalone: true
})

export class PanelAdminPerfilesComponent  implements OnInit {
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
