import { Component, OnInit } from '@angular/core';
import {InfiniteScrollCustomEvent, IonicModule} from "@ionic/angular";
import {MenuInferiorAdminComponent} from "../menu-inferior-admin/menu-inferior-admin.component";
import {BuscadorMenuComponent} from "../buscador-menu/buscador-menu.component";
import {PanelAdminComponent} from "../panel-admin/panel-admin.component";
import {ProductosService} from "../services/productos.service";
import {Producto} from "../modelos/Producto";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-panel-admin-productos',
  templateUrl: './panel-admin-publicaciones.component.html',
  styleUrls: ['./panel-admin-publicaciones.component.scss'],
  imports: [
    IonicModule,
    MenuInferiorAdminComponent,
    BuscadorMenuComponent,
    PanelAdminComponent,
    CommonModule
  ],
  standalone: true
})
export class PanelAdminPublicacionesComponent  implements OnInit {
  items: string[] = [];
  productos: Producto[] = [];


  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.generateItems();
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error fetching productos', err);
      }
    });
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
