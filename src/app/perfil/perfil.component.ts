import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { settings, heartOutline } from "ionicons/icons";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { RouterLink } from "@angular/router";
import { Perfil } from '../modelos/Perfil';
import { PerfilesService } from '../services/perfiles.service';
import { AuthService } from "../services/auth.service";
import { NgIf } from "@angular/common";
import { ProductosService } from "../services/productos.service";
import { Producto } from '../modelos/Producto';
import { CommonModule } from "@angular/common";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [
    IonicModule,
    MenuInferiorComponent,
    RouterLink,
    NgIf,
    CommonModule
  ],
  standalone: true
})

export class PerfilComponent implements OnInit {
  items: string[] = [];
  perfil: Perfil | null = null;
  seguidores: Perfil[] = [];
  seguidos: Perfil[] = [];
  productos: Producto[] = [];

  constructor(
    private perfilesService: PerfilesService,
    private authService: AuthService,
    private productosService: ProductosService,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) {
    addIcons({
      'settings': settings,
      'heartOutline': heartOutline
    });
  }

  ngOnInit() {
    this.cargarPerfil();
    this.cargarProductos();
  }

  private cargarPerfil() {
    const perfilId = this.authService.getPerfilIdFromToken();
    console.log('Perfil ID:', perfilId);
    if (perfilId) {
      this.perfilesService.getPerfilById(perfilId).subscribe({
        next: (data: Perfil) => {
          this.perfil = data;
          console.log('Perfil:', this.perfil);
          this.toastOkService.presentToast('Perfil cargado con éxito', 3000);
        },
        error: () => {
          this.toastErrorService.presentToast('Error al cargar el perfil', 3000);
        }
      });

      this.perfilesService.getSeguidores(perfilId).subscribe({
        next: (data: Perfil[]) => {
          this.seguidores = data;
          console.log('Seguidores:', this.seguidores);
          this.toastOkService.presentToast('Seguidores cargados con éxito', 3000);
        },
        error: () => {
          this.toastErrorService.presentToast('Error al cargar los seguidores', 3000);
        }
      });

      this.perfilesService.getSeguidos(perfilId).subscribe({
        next: (data: Perfil[]) => {
          this.seguidos = data;
          console.log('Seguidos:', this.seguidos);
          this.toastOkService.presentToast('Seguidos cargados con éxito', 3000);
        },
        error: () => {
          this.toastErrorService.presentToast('Error al cargar los seguidos', 3000);
        }
      });
    } else {
      this.toastErrorService.presentToast('Error al obtener el ID del perfil', 3000);
    }
  }

  cargarProductos(): void {
    const perfilId: number | undefined = this.authService.getPerfilIdFromToken() ?? undefined;
    this.productosService.getProductosByPerfilId(perfilId).subscribe(
      (productos) => {
        this.productos = productos;
        this.toastOkService.presentToast('Productos cargados con éxito', 3000);
      },
      () => {
        this.toastErrorService.presentToast('Error al cargar los productos', 3000);
      }
    );
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }
}
