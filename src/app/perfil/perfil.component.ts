import { Component, OnInit } from '@angular/core';
import {ActionSheetController, InfiniteScrollCustomEvent, IonicModule} from "@ionic/angular";
import { addIcons } from "ionicons";
import {settings, heartOutline, createOutline, trash, trashOutline} from "ionicons/icons";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { RouterLink, ActivatedRoute, Router } from "@angular/router";
import { Perfil } from '../modelos/Perfil';
import { PerfilesService } from '../services/perfiles.service';
import { AuthService } from "../services/auth.service";
import { NgIf } from "@angular/common";
import { ProductosService } from "../services/productos.service";
import { Producto } from '../modelos/Producto';
import { CommonModule } from "@angular/common";
import { SeguirDTO } from '../modelos/SeguirDTO';
import { FavoritosService } from '../services/favoritos.service';

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
  esSeguidor: boolean = false;
  favoritos: { [key: number]: boolean } = {};
  perfiles: { [key: number]: any } = {};
  perfilId: number | null = null;


  constructor(
    private actionSheetCtrl: ActionSheetController,
    private perfilesService: PerfilesService,
    private authService: AuthService,
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private favoritosService: FavoritosService,
    private router: Router,

  ) {
    addIcons({
      'settings': settings,
      'heartOutline': heartOutline,
      'create': createOutline,
      'trash': trashOutline
    });
  }

  ngOnInit() {
    this.perfilId = this.authService.getPerfilIdFromToken();
    this.route.paramMap.subscribe(params => {
      const perfilId = params.get('id');
      if (perfilId) {
        this.showSettingsButton = false;
        this.cargarPerfil(parseInt(perfilId, 10));
        this.cargarProductos(parseInt(perfilId, 10));
        this.verificarSeguidor(parseInt(perfilId, 10));

      } else {
        this.cargarPerfil();
        this.cargarProductos();
      }
    });
  }

  async redirigir() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Modificar perfil',
          icon: 'create',
          handler: () => {
            this.router.navigate(['/modificar-perfil']);
          }
        },
        {
          text: 'Cerrar sesión',
          icon: 'log-out',
          handler: () => {
            this.authService.cerrarSesion();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  flipBack(event: Event) {
    const cardInner = (event.currentTarget as HTMLElement).querySelector('.card-inner');
    if (cardInner) {
      cardInner.classList.toggle('flipped');
    }
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

  verificarSeguidor(perfilId: number) {
    const seguirDTO: SeguirDTO = {
      idSeguidor: this.authService.getPerfilIdFromToken()!,
      idSeguido: perfilId
    };
    this.perfilesService.esSeguidor(seguirDTO).subscribe({
      next: (data: boolean) => {
        this.esSeguidor = data;
      },
    });
  }

  seguir() {
    const seguirDTO: SeguirDTO = {
      idSeguidor: this.authService.getPerfilIdFromToken()!,
      idSeguido: this.perfil!.id
    };
    this.perfilesService.seguirPerfil(seguirDTO).subscribe({
      next: () => {
        this.esSeguidor = true;
        const perfilSeguidor: Perfil = { id: this.authService.getPerfilIdFromToken()! } as Perfil;
        this.seguidores.push(perfilSeguidor); // Add the current user's Perfil object to the followers list
      },
      error: () => {
        console.error('Error al seguir');
      }
    });
  }

  dejarDeSeguir() {
    const seguirDTO: SeguirDTO = {
      idSeguidor: this.authService.getPerfilIdFromToken()!,
      idSeguido: this.perfil!.id
    };
    this.perfilesService.dejarDeSeguirPerfil(seguirDTO).subscribe({
      next: () => {
        this.esSeguidor = false;
        const perfilSeguidorId = this.authService.getPerfilIdFromToken()!;
        const index = this.seguidores.findIndex(seguidor => seguidor.id === perfilSeguidorId);
        if (index > -1) {
          this.seguidores.splice(index, 1); // Remove the current user's Perfil object from the followers list
        }
      },
      error: (err) => {
        console.error('Error al dejar de seguir:', err);
      }
    });
  }

  cargarProductos(perfilId?: number): void {
    if (perfilId === undefined) {
      const idFromToken = this.authService.getPerfilIdFromToken();
      if (idFromToken !== null) {
        perfilId = idFromToken;
      } else {
        return;
      }
    }
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

  verProducto(event: Event, id: number) {
    event.stopPropagation();
    this.router.navigate(['/productos', id]);
  }

  confirmarBorrado(productId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productosService.eliminarProducto(productId).subscribe({
        next: () => {
          this.productos = this.productos.filter(producto => producto.id !== productId);
          console.log('Producto eliminado con éxito');
        },
        error: err => {
          if (err.status === 200) {
            this.productos = this.productos.filter(producto => producto.id !== productId);
            console.log('Producto eliminado con éxito');
          } else {
            console.error('Error al eliminar el producto:', err);
          }
        }
      });
    }
  }

}
