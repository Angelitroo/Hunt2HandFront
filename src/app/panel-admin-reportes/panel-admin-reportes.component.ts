import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from "@ionic/angular";
import { PanelAdminComponent } from "../panel-admin/panel-admin.component";
import { MenuInferiorAdminComponent } from "../menu-inferior-admin/menu-inferior-admin.component";
import { BuscadorMenuAdminComponent } from "../buscador-menu-admin/buscador-menu-admin.component";
import { ReportesService } from "../services/reportes.service";
import { Reporte } from '../modelos/Reporte';
import {NgForOf, NgIf} from "@angular/common";
import { PerfilesService } from "../services/perfiles.service";
import { Perfil } from "../modelos/Perfil";
import { BanearPerfil } from "../modelos/BanearPerfil";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';
import {DesbanearPerfil} from "../modelos/DesbanearPerfil";

@Component({
  selector: 'app-panel-admin-reportes',
  templateUrl: './panel-admin-reportes.component.html',
  styleUrls: ['./panel-admin-reportes.component.scss'],
  imports: [
    PanelAdminComponent,
    IonicModule,
    MenuInferiorAdminComponent,
    BuscadorMenuAdminComponent,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class PanelAdminReportesComponent implements OnInit {
  items: string[] = [];
  reportes: Reporte[] = [];
  perfiles: { [key: string]: Perfil } = {};
  baneado: boolean = false;
  noBaneado: boolean = true;

  constructor(
    private reporteService: ReportesService,
    private perfilesService: PerfilesService,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) { }

  ngOnInit() {
    this.generateItems();
    this.reporteService.getReportes().subscribe({
      next: (data) => {
        this.reportes = data;
        this.reportes.forEach(reporte => {
          if (reporte.id_reportado !== undefined) {
            this.loadPerfil(reporte.id_reportado);
          }
          if (reporte.id_reportador !== undefined) {
            this.loadPerfil(reporte.id_reportador);
          }
        });
      },
    });
  }

  loadPerfil(perfilId: number) {
    if (!this.perfiles[perfilId]) {
      this.perfilesService.getPerfilById(perfilId).subscribe({
        next: (data) => {
          this.perfiles[perfilId] = data;
        },
      });
    }
  }

  private getReportes() {
    this.reporteService.getReportes().subscribe({
      next: (data) => {
        this.reportes = data;
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
      this.reporteService.getReporteByNombre(searchValue).subscribe({
        next: (data) => {
          this.reportes = Array.isArray(data) ? data : [data];
        },
      });
    } else {
      this.getReportes();
    }
  }

  banearPerfil(id: number, motivo: string) {
    const banearPerfil: BanearPerfil = {
      idPerfil: id,
      motivo: motivo,
    };

    this.perfilesService.banearPerfil(banearPerfil).subscribe({
      next: () => {
        this.toastOkService.presentToast('Perfil baneado correctamente', 2000);
        this.baneado = true;
        this.noBaneado = false;
      },
      error: (error) => {
        this.toastErrorService.presentToast('Error al banear perfil', 2000);
      },
    });
  }

  desbanearPerfil(id: number) {
    const desbanearPerfil: DesbanearPerfil = {
      idPerfil: id,
    };

    this.perfilesService.desbanearPerfil(desbanearPerfil).subscribe({
      next: () => {
        this.toastOkService.presentToast('Perfil desbaneado correctamente', 2000);
        this.baneado = false;
        this.noBaneado = true;
      },
      error: (error) => {
        this.toastErrorService.presentToast('Error al desbanear perfil', 2000);
      },
    });
  }
}
