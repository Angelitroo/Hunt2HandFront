import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from "@ionic/angular";
import { PanelAdminComponent } from "../panel-admin/panel-admin.component";
import { MenuInferiorAdminComponent } from "../menu-inferior-admin/menu-inferior-admin.component";
import { BuscadorMenuAdminComponent } from "../buscador-menu-admin/buscador-menu-admin.component";
import { ReportesService } from "../services/reportes.service";
import { Reportes } from '../modelos/Reportes';

@Component({
  selector: 'app-panel-admin-reportes',
  templateUrl: './panel-admin-reportes.component.html',
  styleUrls: ['./panel-admin-reportes.component.scss'],
  imports: [
    PanelAdminComponent,
    IonicModule,
    MenuInferiorAdminComponent,
    BuscadorMenuAdminComponent
  ],
  standalone: true
})
export class PanelAdminReportesComponent implements OnInit {
  items: string[] = [];
  reportes: Reportes[] = []; // Cambiado a array

  constructor(private reporteService: ReportesService) { }

  ngOnInit() {
    this.generateItems();
    this.reporteService.getReportes().subscribe((data: Reportes[]) => { // Cambiado a array
      this.reportes = data;
    });
  }

  private getReportes() {
    this.reporteService.getReportes().subscribe({
      next: (data) => {
        this.reportes = data;
      },
      error: (err) => {
        console.error('Error fetching productos', err);
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

  onSearch(searchValue: string) {
    if (searchValue) {
      this.reporteService.getReporteByNombre(searchValue).subscribe({
        next: (data) => {
          this.reportes = Array.isArray(data) ? data : [data];
        },
        error: (err) => {
          console.error('Error fetching producto by nombre', err);
          this.reportes = [];
        }
      });
    } else {
      this.getReportes();
    }
  }
}
