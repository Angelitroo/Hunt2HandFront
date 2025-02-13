import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { PanelAdminComponent } from "../panel-admin/panel-admin.component";
import { MenuInferiorAdminComponent } from "../menu-inferior-admin/menu-inferior-admin.component";
import { Perfil } from '../modelos/Perfil';
import { PerfilesService } from "../services/perfiles.service";
import {Router, RouterLink} from "@angular/router";
import { CommonModule } from '@angular/common';
import { BuscadorMenuAdminComponent } from "../buscador-menu-admin/buscador-menu-admin.component";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';
import {addIcons} from "ionicons";
import {create, trash} from "ionicons/icons";

@Component({
  selector: 'app-panel-admin-perfiles',
  templateUrl: './panel-admin-perfiles.component.html',
  styleUrls: ['./panel-admin-perfiles.component.scss'],
  imports: [
    IonicModule,
    PanelAdminComponent,
    MenuInferiorAdminComponent,
    CommonModule,
    BuscadorMenuAdminComponent,
    RouterLink
  ],
  standalone: true
})

export class PanelAdminPerfilesComponent implements OnInit {
  items: string[] = [];
  perfiles: Perfil[] = [];
  username?: string;
  modoEditarAdmin: boolean = false;

  constructor(
    private perfilesService: PerfilesService,
    private router: Router,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) {
    addIcons({
      'trash': trash,
      'create': create
    });
  }

  ngOnInit() {
    this.generateItems();
    this.modoEditarAdmin = this.esAdmin();
    this.perfilesService.getPerfiles().subscribe({
      next: (data: Perfil[]) => {
        this.perfiles = data;
      },
    });
  }

  esAdmin(): boolean {
    return true;
  }

  private getPerfiles() {
    this.perfilesService.getPerfiles().subscribe({
      next: (data: Perfil[]) => {
        this.perfiles = data;
      },
    });
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

  onSearch(searchValue: string) {
    if (searchValue) {
      this.perfilesService.buscarPorNombre(searchValue).subscribe({
        next: (data) => {
          this.perfiles = data;
        },
        error: (err) => {
          this.perfiles = [];
        }
      });
    } else {
      this.getPerfiles();
    }
  }

  confirmarBorrado(perfilId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este perfil?')) {
      this.perfilesService.eliminarPerfil(perfilId).subscribe({
        next: () => {
          this.perfiles = this.perfiles.filter(perfil => perfil.id !== perfilId);
          console.log('Perfil eliminado con éxito');
        },
        error: err => {
          if (err.status === 200) {
            this.perfiles = this.perfiles.filter(perfil => perfil.id !== perfilId);
            console.log('Perfil eliminado con éxito');
          } else {
            console.error('Error al eliminar el producto:', err);
          }
        }
      });
    }
  }
}
