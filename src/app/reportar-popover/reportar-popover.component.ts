import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { ReportesService } from '../services/reportes.service';
import { AuthService } from '../services/auth.service';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-reportar-popover',
  standalone: true,
  template: `
    <ion-list>
      <ion-item *ngFor="let motivo of motivos" button (click)="seleccionarMotivo(motivo)">
        {{ motivo }}
      </ion-item>
    </ion-list>
  `,
  imports: [
    IonicModule,
    NgForOf
  ],
  styles: [`
    ion-list {
      min-width: 200px;
    }
  `]
})
export class ReportarPopoverComponent implements OnInit {
  @Input() idReportado!: number;
  idReportador!: number;
  yaReportado: boolean = false;

  motivos = [
    'Vende productos falsificados',
    'Estafa o fraude',
    'Información falsa',
    'Mensajes ofensivos'
  ];

  constructor(
    private popoverCtrl: PopoverController,
    private reportesService: ReportesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.idReportador = this.authService.getPerfilIdFromToken() ?? 0;
    this.verificarSiReporto();
  }

  seleccionarMotivo(motivo: string) {
    const fecha = new Date();

    if (!this.idReportador || !this.idReportado) {
      console.error('Faltan datos para crear el reporte');
      return;
    }

    const reporte = { motivo, fecha };
    console.log('Reporte a enviar:', reporte);

    this.reportesService.crearReporte(reporte, this.idReportador, this.idReportado).subscribe({
      next: () => console.log('Reporte enviado correctamente'),
      error: err => console.error('Error al enviar el reporte', err)
    });

    this.popoverCtrl.dismiss();
  }

  verificarSiReporto() {
    this.reportesService.buscarReporte(this.idReportador, this.idReportado).subscribe({
      next: (data) => {
        console.log('Respuesta de buscar Reporte:', data);
        if (data.id_reportador === this.idReportador && data.id_reportado === this.idReportado) {
          this.yaReportado = true;
        } else {
          console.log('No ha reportado aún.');
          this.yaReportado = false;
        }
      },
      error: (err) => {
        console.error('No existe ningun reporte con:', 'Reportador:', this.idReportador, 'Reportado', this.idReportado, err);
        this.yaReportado = false;
      }
    });
  }
}
