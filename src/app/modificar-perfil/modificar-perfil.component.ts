import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { settings, heartOutline } from "ionicons/icons";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { RouterLink, Router } from "@angular/router";
import { PerfilActualizar } from '../modelos/PerfilActualizar';
import { PerfilesService } from '../services/perfiles.service';
import { AuthService } from "../services/auth.service";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    MenuInferiorComponent,
    FormsModule,
  ]
})
export class ModificarPerfilComponent implements OnInit {
  perfilActualizar: PerfilActualizar = {
    id: 0,
    nombre: '',
    apellido: '',
    ubicacion: '',
    username: '',
    imagen: '',
    password: ''
  };

  passwordFieldType: string = 'password';

  constructor(
    private perfilesService: PerfilesService,
    private authService: AuthService,
    private router: Router,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) {
    addIcons({
      'settings': settings,
      'heartOutline': heartOutline
    });
  }

  ngOnInit() {
    this.cargarPerfil();
  }

  private cargarPerfil() {
    const perfilId = this.authService.getPerfilIdFromToken();

    if (perfilId !== null) {
      this.perfilesService.getPerfilActualizadoById(perfilId).subscribe({
        next: (data: PerfilActualizar) => {
          if (data) {
            this.perfilActualizar = { ...data, password: '' };
            this.toastOkService.presentToast('Perfil cargado con éxito', 3000);
          }
        },
      });
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  guardarCambios() {
    if (this.perfilActualizar) {
      const perfilActualizado: Partial<PerfilActualizar> = { ...this.perfilActualizar };

      if (!perfilActualizado.password?.trim()) {
        delete perfilActualizado.password;
      }

      this.perfilesService.actualizar(this.perfilActualizar.id, perfilActualizado).subscribe({
        next: (data: PerfilActualizar) => {
          this.router.navigate(['/perfil']);
          this.toastOkService.presentToast('Perfil actualizado con éxito', 2000);
        },
        error: () => {
          this.toastErrorService.presentToast('Error al actualizar el perfil', 2000);
        }
      });
    }
  }
}
