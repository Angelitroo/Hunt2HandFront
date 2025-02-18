import {Component, HostListener, OnInit} from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { addIcons } from "ionicons";
import {settings, heartOutline, eyeOff, eye} from "ionicons/icons";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import {RouterLink, Router, ActivatedRoute} from "@angular/router";
import { PerfilActualizar } from '../modelos/PerfilActualizar';
import { PerfilesService } from '../services/perfiles.service';
import { AuthService } from "../services/auth.service";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';
import {MenuLateralComponent} from "../menu-lateral/menu-lateral.component";

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    MenuInferiorComponent,
    FormsModule,
    NgIf,
    MenuLateralComponent,
  ]
})
export class ModificarPerfilComponent implements OnInit {
  modoEditar: boolean = false;
  modoEditarAdmin: boolean = false;
  isScreenSmall: boolean = false;

  perfilActualizar: PerfilActualizar = {
    id: 0,
    nombre: '',
    apellido: '',
    ubicacion: '',
    email: '',
    username: '',
    imagen: '',
    password: ''
  };

  passwordFieldType: string = 'password';

  constructor(
    private perfilesService: PerfilesService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) {
    addIcons({
      'settings': settings,
      'heartOutline': heartOutline,
      'eye-off': eyeOff,
      'eye': eye
    });
  }

  ngOnInit() {
    this.checkScreenSize();
    this.route.params.subscribe(params => {
      const perfilId = +params['id'];
      if (!perfilId) {
        this.cargarPerfilPropio();
        this.modoEditar = true;
        this.modoEditarAdmin = false;
      }

      this.route.queryParams.subscribe(queryParams => {
        if (queryParams['admin'] === 'true') {
          this.cargarPerfilPorId(perfilId);
          this.modoEditar = false;
          this.modoEditarAdmin = true;
        }
      });
    });
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  private cargarPerfilPropio() {
    const perfilId = this.authService.getPerfilIdFromToken();

    if (perfilId !== null) {
      this.perfilesService.getPerfilActualizadoById(perfilId).subscribe({
        next: (data: PerfilActualizar) => {
          if (data) {
            this.perfilActualizar = { ...data, password: '' };
          }
        },
      });
    }
  }

  private cargarPerfilPorId(perfilId: number) {
    this.perfilesService.getPerfilActualizadoById(perfilId).subscribe({
      next: (data: PerfilActualizar) => {
        if (data) {
          this.perfilActualizar = { ...data, password: '' };
          this.toastOkService.presentToast('Perfil cargado con éxito', 3000);
        }
      },
    });
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

  modificarPerfilAdmin(): void {
    if (this.perfilActualizar) {
      const perfilActualizado: Partial<PerfilActualizar> = {...this.perfilActualizar};

      if (!perfilActualizado.password?.trim()) {
        delete perfilActualizado.password;
      }

      this.perfilesService.actualizar(this.perfilActualizar.id, perfilActualizado).subscribe({
        next: (data: PerfilActualizar) => {
          this.router.navigate(['/panel-admin-perfiles']);
          this.toastOkService.presentToast('Perfil actualizado con éxito', 2000);
        },
        error: () => {
          this.toastErrorService.presentToast('Error al actualizar el perfil', 2000);
        }
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isScreenSmall = window.innerWidth < 1024;
  }
}
