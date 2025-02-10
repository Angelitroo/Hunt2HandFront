import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from "@ionic/angular";
import { MenuInferiorAdminComponent } from "../menu-inferior-admin/menu-inferior-admin.component";
import { PanelAdminComponent } from "../panel-admin/panel-admin.component";
import { ProductosService } from "../services/productos.service";
import { Producto } from "../modelos/Producto";
import { CommonModule } from "@angular/common";
import { BuscadorMenuAdminComponent } from "../buscador-menu-admin/buscador-menu-admin.component";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';
import {RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import {trash, create} from "ionicons/icons";

@Component({
  selector: 'app-panel-admin-productos',
  templateUrl: './panel-admin-publicaciones.component.html',
  styleUrls: ['./panel-admin-publicaciones.component.scss'],
  imports: [
    IonicModule,
    MenuInferiorAdminComponent,
    PanelAdminComponent,
    CommonModule,
    BuscadorMenuAdminComponent,
    RouterLink,

  ],
  standalone: true
})
export class PanelAdminPublicacionesComponent implements OnInit {
  items: string[] = [];
  productos: Producto[] = [];
  modoEditarAdmin: boolean = false;

  constructor(
    private productosService: ProductosService,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService,

  ) {
    addIcons({
      'trash': trash,
      'create': create
    });
  }

  ngOnInit() {
    this.generateItems();
    this.modoEditarAdmin = this.esAdmin();
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
    });
  }

  esAdmin(): boolean {
    return true;
  }

  private getProductos() {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
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
        error: () => {
          this.productos = [];
        }
      });
    } else {
      this.getProductos();
    }
  }

  confirmarBorrado(productId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productosService.eliminarProducto(productId).subscribe({
        next: () => {
          this.productos = this.productos.filter(producto => producto.id !== productId);
          console.log('Producto eliminado con éxito');
        },
        error: err => {
          if (err.status === 200) {
            this.productos = this.productos.filter(producto => producto.id !== productId);
            console.log('Producto eliminado con éxito');
          } else {
            console.error('Error al eliminar el producto:', err);
          }
        }
      });
    }
  }
}
