// src/app/perfil/perfil.component.ts
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { settings, heartOutline } from "ionicons/icons";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { RouterLink, ActivatedRoute } from "@angular/router";
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
  showSettingsButton: boolean = true;

  constructor(
    private perfilesService: PerfilesService,
    private authService: AuthService,
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService

  ) {
    addIcons({
      'settings': settings,
      'heartOutline': heartOutline
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const perfilId = params.get('id');
      if (perfilId) {
        this.showSettingsButton = false;
        this.cargarPerfil(parseInt(perfilId, 10));
      } else {
        this.cargarPerfil();
      }
    });
    this.cargarProductos();
  }

  private cargarPerfil(perfilId?: number | null) {
    if (!perfilId) {
      perfilId = this.authService.getPerfilIdFromToken();
    }
    console.log('Perfil ID:', perfilId);
    if (perfilId) {
      this.perfilesService.getPerfilById(perfilId).subscribe({
        next: (data: Perfil) => {
          this.perfil = data;
        },
      });

      this.perfilesService.getSeguidores(perfilId).subscribe({
        next: (data: Perfil[]) => {
          this.seguidores = data;
        },
      });

      this.perfilesService.getSeguidos(perfilId).subscribe({
        next: (data: Perfil[]) => {
          this.seguidos = data;
        },
      });
    }
  }

  cargarProductos(): void {
    const perfilId: number | undefined = this.authService.getPerfilIdFromToken() ?? undefined;
    this.productosService.getProductosByPerfilId(perfilId).subscribe(
      (productos) => {
        this.productos = productos;
      },
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
