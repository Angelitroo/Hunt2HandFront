import { Component, OnInit } from '@angular/core';
import {InfiniteScrollCustomEvent, IonicModule} from "@ionic/angular";
import {MenuInferiorAdminComponent} from "../menu-inferior-admin/menu-inferior-admin.component";
import {PanelAdminComponent} from "../panel-admin/panel-admin.component";
import {ProductosService} from "../services/productos.service";
import {Producto} from "../modelos/Producto";
import {CommonModule} from "@angular/common";
import {BuscadorMenuAdminComponent} from "../buscador-menu-admin/buscador-menu-admin.component";

@Component({
  selector: 'app-panel-admin-productos',
  templateUrl: './panel-admin-publicaciones.component.html',
  styleUrls: ['./panel-admin-publicaciones.component.scss'],
  imports: [
    IonicModule,
    MenuInferiorAdminComponent,
    PanelAdminComponent,
    CommonModule,
    BuscadorMenuAdminComponent
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

  private getProductos() {
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

  onSearch(searchValue: string) {
    if (searchValue) {
      this.productosService.getProductoByNombre(searchValue).subscribe({
        next: (data) => {
          this.productos = Array.isArray(data) ? data : [data];
        },
        error: (err) => {
          console.error('Error fetching producto by nombre', err);
          this.productos = [];
        }
      });
    } else {
      this.getProductos();
    }
  }
}
