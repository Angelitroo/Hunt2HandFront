import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductosService } from "../services/productos.service";
import { PerfilesService } from "../services/perfiles.service";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { IonicModule } from "@ionic/angular";
import { NgIf } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { CommonModule } from "@angular/common";
import { FavoritosService } from "../services/favoritos.service";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  imports: [
    MenuInferiorComponent,
    IonicModule,
    NgIf,
    CommonModule,
    RouterLink
  ],
  standalone: true
})

export class ProductoComponent implements OnInit {
  producto: any;
  perfil: any;
  isFavorito: boolean = true;
  perfilId: number | null = null;

  constructor(
    private authService: AuthService,
    private favoritosService: FavoritosService,
    private productosService: ProductosService,
    private perfilService: PerfilesService,
    private route: ActivatedRoute,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) {}

  ngOnInit() {
    this.perfilId = this.authService.getPerfilIdFromToken();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getProductoById(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.loadPerfil(data.perfil);
        this.checkIfFavorito(data.id);
      },
    });
  }

  loadPerfil(perfilId: number) {
    this.perfilService.getPerfilById(perfilId).subscribe({
      next: (data) => {
        this.perfil = data;
      },
    });
  }

  toggleFavorito(event: Event, productoId: number): void {
    event.stopPropagation();
    if (this.isFavorito) {
      this.favoritosService.eliminarFavorito(productoId).subscribe({
        next: () => {
          this.isFavorito = false;
        },
      });
    } else {
      this.favoritosService.anadirFavorito(productoId).subscribe({
        next: () => {
          this.isFavorito = true;
        },
      });
    }
  }

  checkIfFavorito(productoId: number) {
    this.favoritosService.esFavorito(productoId).subscribe({
      next: (isFavorito) => {
        this.isFavorito = isFavorito;
      },
    });
  }
}
