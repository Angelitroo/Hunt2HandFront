import { Component, OnInit } from '@angular/core';
import { IonicModule, ActionSheetController } from "@ionic/angular";
import { Router } from '@angular/router';
import {createOutline, heartOutline, settings, star, trashOutline, warningOutline} from "ionicons/icons";
import { addIcons } from "ionicons";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class PanelAdminComponent implements OnInit {

  constructor(private actionSheetCtrl: ActionSheetController, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    addIcons({
      'settings': settings,
      'heartOutline': heartOutline,
      'create': createOutline,
      'trash': trashOutline,
      'star': star,
      'warning-outline': warningOutline
    });
  }

  async redirigir() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Modificar perfil',
          icon: 'create',
          handler: () => {
            this.router.navigate(['/modificar-perfil']);
          }
        },
        {
          text: 'Cerrar sesión',
          icon: 'log-out',
          handler: () => {
            this.authService.cerrarSesion();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
}
