import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { PanelAdminComponent } from "../panel-admin/panel-admin.component";
import { MenuInferiorAdminComponent } from "../menu-inferior-admin/menu-inferior-admin.component";
import { Perfil } from '../modelos/Perfil';
import { PerfilesService } from "../services/perfiles.service";
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { BuscadorMenuAdminComponent } from "../buscador-menu-admin/buscador-menu-admin.component";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';

@Component({
  selector: 'app-panel-admin-perfiles',
  templateUrl: './panel-admin-perfiles.component.html',
  styleUrls: ['./panel-admin-perfiles.component.scss'],
  imports: [
    IonicModule,
    PanelAdminComponent,
    MenuInferiorAdminComponent,
    CommonModule,
    BuscadorMenuAdminComponent
  ],
  standalone: true
})

export class PanelAdminPerfilesComponent implements OnInit {
  items: string[] = [];
  perfiles: Perfil[] = [];
  username?: string;

  constructor(
    private perfilesService: PerfilesService,
    private router: Router,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) {}

  ngOnInit() {
    this.generateItems();
    this.perfilesService.getPerfiles().subscribe({
      next: (data: Perfil[]) => {
        this.perfiles = data;
      },
    });
  }

  private getPerfiles() {
    this.perfilesService.getPerfiles().subscribe({
      next: (data: Perfil[]) => {
        this.perfiles = data;
      },
    });
  }

  buscarPerfil() {
    if (this.username) {
      this.perfilesService.getPerfilByUsername(this.username).subscribe(
        (perfil: Perfil) => {
          this.perfiles = [perfil];
        },
      );
    }
  }

  eliminarPerfil(id: number | undefined) {
    if (id !== undefined) {
      this.perfilesService.eliminarPerfil(id).subscribe(
        () => {
          this.perfiles = this.perfiles.filter(perfil => perfil.id !== id);
          this.toastOkService.presentToast('Perfil eliminado con éxito', 2000);
        },
        (error) => {
          this.toastErrorService.presentToast('Error al eliminar el perfil', 2000);
        }
      );
    }
  }

  crearPerfil(perfil: Perfil) {
    this.perfilesService.crearPerfil(perfil).subscribe(
      (nuevoPerfil: Perfil) => {
        this.perfiles.push(nuevoPerfil);
        this.toastOkService.presentToast('Perfil creado con éxito', 2000);
      },
      (error) => {
        this.toastErrorService.presentToast('Error al crear el perfil', 2000);
      }
    );
  }

  modificarPerfil(id: number, perfil: Perfil) {
    this.perfilesService.modificarPerfil(id, perfil).subscribe(
      (perfilActualizado: Perfil) => {
        const index = this.perfiles.findIndex(p => p.id === id);
        if (index !== -1) {
          this.perfiles[index] = perfilActualizado;
          this.toastOkService.presentToast('Perfil modificado con éxito', 2000);
        }
      },
      (error) => {
        this.toastErrorService.presentToast('Error al modificar el perfil', 2000);
      }
    );
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
}
