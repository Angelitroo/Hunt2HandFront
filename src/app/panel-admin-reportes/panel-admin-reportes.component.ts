import { Component, OnInit } from '@angular/core';
import {InfiniteScrollCustomEvent, IonicModule} from "@ionic/angular";
import {PanelAdminComponent} from "../panel-admin/panel-admin.component";
import {MenuInferiorAdminComponent} from "../menu-inferior-admin/menu-inferior-admin.component";
import {BuscadorMenuAdminComponent} from "../buscador-menu-admin/buscador-menu-admin.component";

@Component({
  selector: 'app-panel-admin-reportes',
  templateUrl: './panel-admin-reportes.component.html',
  styleUrls: ['./panel-admin-reportes.component.scss'],
  imports: [
    PanelAdminComponent,
    IonicModule,
    MenuInferiorAdminComponent,
    BuscadorMenuAdminComponent
  ],
  standalone: true
})
export class PanelAdminReportesComponent  implements OnInit {
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
