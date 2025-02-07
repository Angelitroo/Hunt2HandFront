import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { heartOutline } from "ionicons/icons";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { BuscadorMenuComponent } from "../buscador-menu/buscador-menu.component";
import { ProductosService } from "../services/productos.service";
import { PerfilesService } from "../services/perfiles.service";
import { Producto } from "../modelos/Producto";
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { FavoritosService } from "../services/favoritos.service";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from "../services/toast-error.service";
import {AuthService} from "../services/auth.service";

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
  idUsuario: number = 0;
  productos: Producto[] = [];
  perfiles: { [key: number]: any } = {};
  favoritos: { [key: number]: boolean } = {};
  categorias: string[] = [
    'Vehiculos',
    'Ropa',
    'Electrodomesticos',
    'Tecnologia',
    'Deportes',
    'Hogar',
    'Jardineria',
    'Mascotas',
    'Otros',
    'Juguetes',
    'Libros',
    'Muebles',
    'Belleza',
    'Salud',
    'Herramientas',
    'Musica',
    'Arte',
    'Coleccionables',
    'Bebes',
    'Alimentos y bebidas'
  ];
  productosPorCategoria: { [key: string]: Producto[] } = {};
  perfilId: number | null = null;

  constructor(
    private productosService: ProductosService,
    private perfilesService: PerfilesService,
    private authService: AuthService,
    private router: Router,
    private favoritosService: FavoritosService,
    private authService: AuthService // Inject AuthService
    private favoritosService: FavoritosService
  ) {
    addIcons({
      'heart-outline': heartOutline
    });
  }

  ngOnInit() {
    this.perfilId = this.authService.getPerfilIdFromToken();
    this.generateItems();
    this.loadProductos();
  }

  flipBack(event: Event) {
    const cardInner = (event.currentTarget as HTMLElement).querySelector('.card-inner');
    if (cardInner) {
      cardInner.classList.toggle('flipped');
    }
  }

  ngOnInit() {
    this.idUsuario = this.authService.getPerfilIdFromToken() ?? 0;
    this.categorias.forEach(categoria => {
      this.getProductoByCategoria(categoria);
    });
  }

  private loadProductos() {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data.filter(producto => producto.perfil !== this.perfilId); // Filter out products from the logged-in user
        this.productos.forEach(producto => {
          this.loadPerfil(producto.perfil);
          this.checkIfFavorito(producto.id);
        });
      },
    });
  }

  loadPerfil(perfilId: number) {
    if (!this.perfiles[perfilId]) {
      this.perfilesService.getPerfilById(perfilId).subscribe({
        next: (data) => {
          this.perfiles[perfilId] = data;
        },
      });
    }
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

  verProducto(event: Event, id: number) {
    event.stopPropagation();
    this.router.navigate(['/productos', id]);
  }

  checkIfFavorito(productoId: number) {
    this.favoritosService.esFavorito(productoId).subscribe({
      next: (isFavorito) => {
        this.favoritos[productoId] = isFavorito;
      },
    });
  }

  toggleFavorito(event: Event, productoId: number) {
    event.stopPropagation();
    if (this.favoritos[productoId]) {
      this.favoritosService.eliminarFavorito(productoId).subscribe({
        next: () => {
          this.favoritos[productoId] = false;
        },
      });
    } else {
      this.favoritosService.anadirFavorito(productoId).subscribe({
        next: () => {
          this.favoritos[productoId] = true;
        },
      });
    }
  }

  getProductoByCategoria(categoria: string) {
    if (!categoria) {
      this.productosPorCategoria[categoria] = [];
      return;
    }

    this.productosService.getProductoByCategoria(categoria).subscribe({
      next: (data) => {
        this.productosPorCategoria[categoria] = (data || []).filter(producto => producto.perfil !== this.idUsuario);
        this.productosPorCategoria[categoria].forEach(producto => {
          this.loadPerfil(producto.perfil);
          this.checkIfFavorito(producto.id);
        });
      },
      error: () => {
        this.productosPorCategoria[categoria] = [];
      }
    });
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
      this.loadProductos();
    }
  }
}
