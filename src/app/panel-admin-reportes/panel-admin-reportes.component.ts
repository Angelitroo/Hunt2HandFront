import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from "@ionic/angular";
import { PanelAdminComponent } from "../panel-admin/panel-admin.component";
import { MenuInferiorAdminComponent } from "../menu-inferior-admin/menu-inferior-admin.component";
import { BuscadorMenuAdminComponent } from "../buscador-menu-admin/buscador-menu-admin.component";
import { ReportesService } from "../services/reportes.service";
import { Reportes } from '../modelos/Reportes';
import { NgForOf } from "@angular/common";
import { PerfilesService } from "../services/perfiles.service";
import { Perfil } from "../modelos/Perfil";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';

@Component({
  selector: 'app-panel-admin-reportes',
  templateUrl: './panel-admin-reportes.component.html',
  styleUrls: ['./panel-admin-reportes.component.scss'],
  imports: [
    PanelAdminComponent,
    IonicModule,
    MenuInferiorAdminComponent,
    BuscadorMenuAdminComponent,
    NgForOf
  ],
  standalone: true
})
export class PanelAdminReportesComponent implements OnInit {
  items: string[] = [];
  reportes: Reportes[] = [];
  perfiles: { [key: string]: Perfil } = {};

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
          if (reporte.reportado !== undefined) {
            this.loadPerfil(reporte.reportado);
          }
          if (reporte.reportador !== undefined) {
            this.loadPerfil(reporte.reportador);
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
}
