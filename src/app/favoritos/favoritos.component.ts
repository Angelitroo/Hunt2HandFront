import { Component, OnInit } from '@angular/core';
import { Producto } from "../modelos/Producto";
import { ProductosService } from "../services/productos.service";
import { Router } from "@angular/router";
import { addIcons } from "ionicons";
import { heartOutline } from "ionicons/icons";
import { InfiniteScrollCustomEvent, IonicModule } from "@ionic/angular";
import { BuscadorMenuComponent } from "../buscador-menu/buscador-menu.component";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { NgForOf } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { FavoritosService } from "../services/favoritos.service";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';

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
export class FavoritosComponent implements OnInit {
  productos: Producto[] = [];
  favoritos: { [key: number]: boolean } = {};

  constructor(
    private authService: AuthService,
    private productosService: ProductosService,
    private router: Router,
    private favoritosService: FavoritosService,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) {
    addIcons({
      'heart-outline': heartOutline
    });
  }

  ngOnInit() {
    this.loadFavoritos();
  }

  ionViewWillEnter() {
    this.loadFavoritos();
  }

  flipBack(event: Event) {
    const cardInner = (event.currentTarget as HTMLElement).querySelector('.card-inner');
    if (cardInner) {
      cardInner.classList.toggle('flipped');
    }
  }

  private loadFavoritos() {
    const idPerfil = this.authService.getPerfilIdFromToken();
    if (idPerfil) {
      this.favoritosService.getFavoritosByPerfil(idPerfil).subscribe({
        next: (favoritos) => {
          this.productos = favoritos.map(favorito => favorito.producto);
          this.productos.forEach(producto => {
            this.favoritos[producto.id] = true;
          });
        },
      });
    }
  }

  toggleFavorito(event: Event, productoId: number) {
    event.stopPropagation();
    if (this.favoritos[productoId]) {
      this.favoritosService.eliminarFavorito(productoId).subscribe({
        next: () => {
          this.favoritos[productoId] = false;
          this.loadFavoritos();
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

  verProducto(event: Event, id: number) {
    event.stopPropagation();
    this.router.navigate(['/productos', id]);
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
      this.loadFavoritos();
    }
  }


  onIonInfinite(event: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
