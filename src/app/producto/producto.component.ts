import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ProductosService } from "../services/productos.service";
import { PerfilesService } from "../services/perfiles.service";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { IonicModule } from "@ionic/angular";
import { NgIf } from "@angular/common";
import {AuthService} from "../services/auth.service";
import {CommonModule} from "@angular/common";
import {FavoritosService} from "../services/favoritos.service";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  imports: [
    MenuInferiorComponent,
    IonicModule,
    NgIf,
    RouterLink,
    CommonModule
  ],
  standalone: true
})

export class ProductoComponent implements OnInit {
  producto: any;
  perfil: any;
  isFavorito: boolean = true;

  constructor(
    private authService: AuthService,
    private favoritosService: FavoritosService,
    private productosService: ProductosService,
    private perfilService: PerfilesService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getProductoById(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.loadPerfil(data.perfil);
        this.checkIfFavorito(data.id);
      },
      error: (err) => {
        console.error('Error fetching producto by id', err);
      }
    });
  }

  loadPerfil(perfilId: number) {
    this.perfilService.getPerfilById(perfilId).subscribe({
      next: (data) => {
        this.perfil = data;
      },
      error: (err) => {
        console.error('Error fetching perfil by id', err);
      }
    });
  }

  toggleFavorito(event: Event, productoId: number): void {
    event.stopPropagation();
    if (this.isFavorito) {
      this.favoritosService.eliminarFavorito(productoId).subscribe({
        next: () => {
          this.isFavorito = false;
          console.log('Producto eliminado de favoritos');
        },
        error: err => console.error('Error al eliminar de favoritos:', err)
      });
    } else {
      this.favoritosService.anadirFavorito(productoId).subscribe({
        next: () => {
          this.isFavorito = true;
          console.log('Producto agregado a favoritos');
        },
        error: err => console.error('Error al agregar a favoritos:', err)
      });
    }
  }

  checkIfFavorito(productoId: number) {
    this.favoritosService.esFavorito(productoId).subscribe({
      next: (isFavorito) => {
        this.isFavorito = isFavorito;
      },
      error: (err) => {
        console.error('Error checking if producto is favorito', err);
      }
    });
  }
}
