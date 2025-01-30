import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { heartOutline } from "ionicons/icons";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { BuscadorMenuComponent } from "../buscador-menu/buscador-menu.component";
import { ProductosService } from "../services/productos.service";
import { Producto } from "../modelos/Producto";
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  imports: [
    IonicModule,
    MenuInferiorComponent,
    BuscadorMenuComponent,
    CommonModule
  ],
  standalone: true
})
export class ProductosComponent implements OnInit {
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
