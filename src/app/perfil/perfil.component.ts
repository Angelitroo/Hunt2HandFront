// src/app/perfil/perfil.component.ts
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
import {ProductosService} from "../services/productos.service";
import { Producto } from '../modelos/Producto';
import {CommonModule} from "@angular/common";

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



  constructor(private perfilesService: PerfilesService, private authService: AuthService, private productosService: ProductosService,
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
        },
        error: err => console.error("Error al obtener el perfil:", err)
      });

      this.perfilesService.getSeguidores(perfilId).subscribe({
        next: (data: Perfil[]) => {
          this.seguidores = data;
          console.log('Seguidores:', this.seguidores);
        },
        error: err => console.error("Error al obtener seguidores:", err)
      });

      this.perfilesService.getSeguidos(perfilId).subscribe({
        next: (data: Perfil[]) => {
          this.seguidos = data;
          console.log('Seguidos:', this.seguidos);
        },
        error: err => console.error("Error al obtener seguidos:", err)
      });
    } else {
      console.log('No se encontró el perfil ID en el token');
    }
  }

  cargarProductos(): void {
    const perfilId: number | undefined = this.authService.getPerfilIdFromToken()??undefined;
    this.productosService.getProductosByPerfilId(perfilId).subscribe(
      (productos) => {
        this.productos = productos;
      },
      (error) => {
        console.error('Error al cargar los productos del perfil', error);
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
