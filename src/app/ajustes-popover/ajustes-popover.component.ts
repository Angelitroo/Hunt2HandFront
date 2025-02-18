import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-ajustes-popover',
  standalone: true,
  template: `
    <ion-list>
      <ion-item *ngFor="let opcion of opciones" button (click)="seleccionarOpcion(opcion)">
        <ion-icon [name]="opcion.icon" slot="start"></ion-icon>
        {{ opcion.text }}
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
export class AjustesPopoverComponent implements OnInit {
  opciones = [
    { text: 'Modificar perfil', icon: 'create' },
    { text: 'Cerrar sesión', icon: 'log-out' },
    { text: 'Cancelar', icon: 'close', role: 'cancel' }
  ];

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  seleccionarOpcion(opcion: any) {
    switch (opcion.text) {
      case 'Modificar perfil':
        this.router.navigate(['/modificar-perfil']);
        break;
      case 'Cerrar sesión':
        this.authService.cerrarSesion();
        break;
      case 'Cancelar':
        break;
    }
    this.popoverCtrl.dismiss();
  }
}
