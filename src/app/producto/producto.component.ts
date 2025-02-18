import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { ProductosService } from "../services/productos.service";
import { PerfilesService } from "../services/perfiles.service";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { IonicModule } from "@ionic/angular";
import { NgIf } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { CommonModule } from "@angular/common";
import { FavoritosService } from "../services/favoritos.service";
import {addIcons} from "ionicons";
import {chatboxOutline, heartOutline, star} from "ionicons/icons";
import {ChatService} from "../services/chat.service";
import {Chat} from "../modelos/Chat";
import {MenuLateralComponent} from "../menu-lateral/menu-lateral.component";
import {ResenaService} from "../services/resena.service";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
    imports: [
        MenuInferiorComponent,
        IonicModule,
        NgIf,
        CommonModule,
        RouterLink,
        MenuLateralComponent
    ],
  standalone: true
})

export class ProductoComponent implements OnInit {
  producto: any;
  perfil: any;
  isScreenSmall: boolean = false;
  isFavorito: boolean = true;
  perfilId: number | null = null;
  resena: number = 0;


  constructor(
    private authService: AuthService,
    private favoritosService: FavoritosService,
    private productosService: ProductosService,
    private perfilService: PerfilesService,
    private route: ActivatedRoute,
    private router: Router,
    private chatService: ChatService,
    private resenaService: ResenaService
  ) {
    addIcons({
      'chatboxes': chatboxOutline,
      'star': star,
    });
  }

  ngOnInit() {
    this.cargarValoracion();
    this.checkScreenSize();
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

  crearChat(): void {
    const perfilId = this.authService.getPerfilIdFromToken();
    if (perfilId === null) {
      console.error('Perfil ID is null');
      return;
    }

    const chat: Partial<Chat> = {
      id_creador: perfilId,
      id_receptor: this.perfil.id
    };

    this.chatService.crearChat(chat).subscribe({
      next: (newChat) => {
        console.log('Chat created:', newChat);
        this.router.navigate(['/dentro-chat', newChat.id]); // Navegar a la página del chat
      },
      error: (err) => {
        console.error('Error creating chat:', err);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isScreenSmall = window.innerWidth < 1024;
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
}
