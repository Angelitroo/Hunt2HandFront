import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import { settings, heartOutline } from "ionicons/icons";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { RouterLink } from "@angular/router";
import { PerfilActualizar } from '../modelos/PerfilActualizar';
import { PerfilesService } from '../services/perfiles.service';
import { AuthService } from "../services/auth.service";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

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

  constructor(private perfilesService: PerfilesService, private authService: AuthService) {
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
    console.log('Perfil ID:', perfilId);

    if (perfilId !== null) {
      this.perfilesService.getPerfilActualizadoById(perfilId).subscribe({
        next: (data: PerfilActualizar) => {
          if (data) {
            this.perfilActualizar = { ...data, password: '' };
            console.log('Perfil cargado:', this.perfilActualizar);
          }
        },
        error: err => console.error("Error al obtener el perfil:", err)
      });
    } else {
      console.error("No se pudo obtener el ID del perfil del token.");
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
          console.log('Perfil actualizado correctamente:', data);
        },
        error: err => console.error("Error al actualizar el perfil:", err)
      });
    }
  }
}
