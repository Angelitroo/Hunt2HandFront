import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { BuscadorMenuComponent } from "../buscador-menu/buscador-menu.component";
import { PanelAdminComponent } from "../panel-admin/panel-admin.component";
import { MenuInferiorAdminComponent } from "../menu-inferior-admin/menu-inferior-admin.component";
import { Perfil } from '../modelos/Perfil';
import { PerfilesService } from "../services/perfiles.service";
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-admin-perfiles',
  templateUrl: './panel-admin-perfiles.component.html',
  styleUrls: ['./panel-admin-perfiles.component.scss'],
  imports: [
    IonicModule,
    BuscadorMenuComponent,
    PanelAdminComponent,
    MenuInferiorAdminComponent,
    CommonModule
  ],
  standalone: true
})

export class PanelAdminPerfilesComponent implements OnInit {
  items: string[] = [];
  perfiles: Perfil[] = [];
  username?: string;

  constructor(private perfilesService: PerfilesService, private router: Router) {}

  ngOnInit() {
    this.generateItems();
    this.perfilesService.getPerfiles().subscribe(
      (data: Perfil[]) => {
        console.log('Perfiles cargados:', data);
        this.perfiles = data;
      },
      (error) => console.error('Error al cargar perfiles:', error)
    );
  }

  buscarPerfil() {
    if (this.username) {
      this.perfilesService.getPerfilByUsername(this.username).subscribe((perfil: Perfil) => {
        this.perfiles = [perfil];
      });
    }
  }

  eliminarPerfil(id: number | undefined) {
    if (id !== undefined) {
      this.perfilesService.eliminarPerfil(id).subscribe(() => {
        this.perfiles = this.perfiles.filter(perfil => perfil.id !== id);
      });
    }
  }

  crearPerfily(perfil: Perfil) {
    this.perfilesService.crearPerfil(perfil).subscribe((nuevoPerfil: Perfil) => {
      this.perfiles.push(nuevoPerfil);
    });
  }

  modificarPerfil(id: number, perfil: Perfil) {
    this.perfilesService.modificarPerfil(id, perfil).subscribe((perfilActualizado: Perfil) => {
      const index = this.perfiles.findIndex(p => p.id === id);
      if (index !== -1) {
        this.perfiles[index] = perfilActualizado;
      }
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
}
