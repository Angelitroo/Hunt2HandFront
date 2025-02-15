// productos.component.ts
import {Component, HostListener, OnInit} from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { chatbox, heartOutline } from "ionicons/icons";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { BuscadorMenuComponent } from "../buscador-menu/buscador-menu.component";
import { ProductosService } from "../services/productos.service";
import { PerfilesService } from "../services/perfiles.service";
import { Producto } from "../modelos/Producto";
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { FavoritosService } from "../services/favoritos.service";
import { AuthService } from "../services/auth.service";
import { Perfil } from '../modelos/Perfil';
import {MenuLateralComponent} from "../menu-lateral/menu-lateral.component";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  imports: [
    IonicModule,
    MenuInferiorComponent,
    BuscadorMenuComponent,
    CommonModule,
    MenuLateralComponent
  ],
  standalone: true
})
export class ProductosComponent implements OnInit {
  items: string[] = [];
  idUsuario: number = 0;
  productos: Producto[] = [];
  isScreenSmall: boolean = false;
  productosSeguidos: Producto[] = []; // Productos de los perfiles seguidos
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
    private favoritosService: FavoritosService
  ) {
    addIcons({
      'heart-outline': heartOutline
    });
  }

  ngOnInit() {
    this.checkScreenSize();
    this.perfilId = this.authService.getPerfilIdFromToken();
    this.generateItems();
    this.loadProductos();
    this.idUsuario = this.authService.getPerfilIdFromToken() ?? 0;
    this.categorias.forEach(categoria => {
      this.getProductoByCategoria(categoria);
    });
    this.getProductosSeguidos();
  }

  flipBack(event: Event) {
    const cardInner = (event.currentTarget as HTMLElement).querySelector('.card-inner');
    if (cardInner) {
      cardInner.classList.toggle('flipped');
      setTimeout(() => {
        cardInner.classList.toggle('flipped');
      }, 5000);
    }
  }

  private loadProductos() {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data.filter(producto => producto.perfil !== this.perfilId);
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

  getProductosSeguidos() {
    const perfilId = this.authService.getPerfilIdFromToken();
    if (perfilId === null) {
      console.error('El perfilId es null');
      return;
    }
    this.perfilesService.getSeguidos(perfilId).subscribe(
      (seguidos: Perfil[]) => {
        console.log('Respuesta de la API:', seguidos); // <-- Verifica la respuesta en consola
        seguidos.forEach((seguidor: Perfil) => {
          this.productosService.getProductosByPerfilId(seguidor.id).subscribe(
            (productos: Producto[]) => {
              this.productosSeguidos = this.productosSeguidos.concat(
                productos.filter((p: Producto) => p.perfil !== this.idUsuario)
              );
              console.log('Productos de seguidos:', productos);

              // Procesa cada producto
              productos.forEach(producto => {
                this.loadPerfil(producto.perfil);
                this.checkIfFavorito(producto.id);
              });
            },
            (err) => {
              console.error('Error fetching products for seguidor', seguidor.id, err);
            }
          );
        });
      },
      (err) => {
        console.error('Error fetching seguidos', err);
      }
    );
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isScreenSmall = window.innerWidth < 1024;
  }
}
