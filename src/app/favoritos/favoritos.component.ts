import { Component, OnInit } from '@angular/core';
import {Producto} from "../modelos/Producto";
import {ProductosService} from "../services/productos.service";
import {Router} from "@angular/router";
import {addIcons} from "ionicons";
import {heartOutline} from "ionicons/icons";
import {InfiniteScrollCustomEvent, IonicModule} from "@ionic/angular";
import {BuscadorMenuComponent} from "../buscador-menu/buscador-menu.component";
import {MenuInferiorComponent} from "../menu-inferior/menu-inferior.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
  imports: [
    IonicModule,
    BuscadorMenuComponent,
    MenuInferiorComponent,
    NgForOf
  ],
  standalone: true
})

export class FavoritosComponent  implements OnInit {
  items: string[] = [];
  productos: Producto[] = [];

  constructor(private productosService: ProductosService, private router: Router) {
    addIcons({
      'heart-outline': heartOutline
    });
  }

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

  verProducto(id: number) {
    this.router.navigate(['/publicaciones', id]);
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
