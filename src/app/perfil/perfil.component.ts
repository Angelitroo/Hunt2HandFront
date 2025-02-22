import {Component, HostListener, OnInit} from '@angular/core';
import {ActionSheetController, InfiniteScrollCustomEvent, IonicModule, PopoverController} from "@ionic/angular";
import { addIcons } from "ionicons";
import {settings, heartOutline, createOutline, trash, trashOutline, star, warningOutline} from "ionicons/icons";
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
import {ResenaService} from "../services/resena.service";
import {FormsModule} from "@angular/forms";
import {ReportarPopoverComponent} from "../reportar-popover/reportar-popover.component";
import {ReportesService} from "../services/reportes.service";
import {MenuLateralComponent} from "../menu-lateral/menu-lateral.component";
import {AjustesPopoverComponent} from "../ajustes-popover/ajustes-popover.component";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [
    IonicModule,
    MenuInferiorComponent,
    RouterLink,
    NgIf,
    CommonModule,
    FormsModule,
    MenuLateralComponent
  ],
  standalone: true
})

export class PerfilComponent implements OnInit {
  items: string[] = [];
  perfil: Perfil | null = null;
  seguidores: Perfil[] = [];
  seguidos: Perfil[] = [];
  productos: Producto[] = [];
  isScreenSmall: boolean = false;
  ajustesreportes: boolean = true;
  esSeguidor: boolean = false;
  favoritos: { [key: number]: boolean } = {};
  perfiles: { [key: number]: any } = {};
  perfilId: number | null = null;
  resena: number = 0;

  yaReportado: boolean = false;

  constructor(
    private popoverCtrl: PopoverController,
    private actionSheetCtrl: ActionSheetController,
    private perfilesService: PerfilesService,
    private authService: AuthService,
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private favoritosService: FavoritosService,
    private router: Router,
    private resenaService: ResenaService,
  private reportesService:   ReportesService

  ) {
    addIcons({
      'settings': settings,
      'heartOutline': heartOutline,
      'create': createOutline,
      'trash': trashOutline,
      'star': star,
      'warning-outline': warningOutline
    });
  }

  ngOnInit() {
    this.checkScreenSize();
    this.perfilId = this.authService.getPerfilIdFromToken();
    this.route.paramMap.subscribe(params => {
      const perfilId = params.get('id');
      if (perfilId) {
        this.ajustesreportes = false;
        const idNumerico = parseInt(perfilId, 10);
        this.cargarPerfil(idNumerico);
        this.cargarProductos(idNumerico);
        this.verificarSeguidor(idNumerico);
        this.cargarValoracion(idNumerico);
        this.verificarSiReporto(idNumerico);
      } else {
        this.cargarPerfil();
        this.cargarProductos();
        this.cargarValoracion();
        if (this.perfilId) {
          this.verificarSiReporto(this.perfilId);
        }
      }
    });
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
        this.seguidores.push(perfilSeguidor);
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
          this.seguidores.splice(index, 1);
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

  cargarValoracion(perfilId?: number) {
    if (perfilId === undefined) {
      const idFromToken = this.authService.getPerfilIdFromToken();
      if (idFromToken !== null) {
        perfilId = idFromToken;
      } else {
        console.log('No se pudo obtener el perfilId del token.');
        return;
      }
    }
    console.log('Perfil ID para cargar valoración:', perfilId);
    this.resenaService.buscarResenaMedia(perfilId).subscribe(
      (media) => {
        console.log('Respuesta de buscarResenaMedia:', media);
        this.resena = media;
      },
      (error) => {
        console.error('Error al buscar la valoración media:', error);
      }
    );
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

  verificarSiReporto(idReportado: number) {
    const idReportador = this.authService.getPerfilIdFromToken() ?? 0;
    this.reportesService.buscarReporte(idReportador, idReportado).subscribe({
      next: (data) => {
        console.log('Respuesta de buscar Reporte:', data);
        if (data.id_reportador === idReportador && data.id_reportado === idReportado) {
          this.yaReportado = true;
        } else {
          console.log('No ha reportado aún.');
          this.yaReportado = false;
        }
      },
      error: (err) => {
        console.error('No existe ningun reporte con:', 'Reportador:', idReportador, 'Reportado', idReportado, err);
        this.yaReportado = false;
      }
    });
  }

  async mostrarReportes(ev: Event) {
    if (!this.perfil) return;

    const popoverReportar = await this.popoverCtrl.create({
      component: ReportarPopoverComponent,
      componentProps: { idReportado: this.perfil.id },
      event: ev,
      translucent: false,
      cssClass: 'custom-popover',
    });

    await popoverReportar.present();
  }
  async mostrarAjustes(ev: Event) {
    if (!this.perfil) return;

    const popoverAjustes = await this.popoverCtrl.create({
      component: AjustesPopoverComponent,
      componentProps: { idReportado: this.perfil.id },
      event: ev,
      translucent: false,
      cssClass: 'custom-popover',
    });

    await popoverAjustes.present();
  }



  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isScreenSmall = window.innerWidth < 1024;
  }


}
