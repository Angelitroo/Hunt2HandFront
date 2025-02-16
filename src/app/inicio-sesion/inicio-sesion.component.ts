import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController, Platform } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { Keyboard } from '@capacitor/keyboard';
import { Router, RouterLink } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { addIcons } from "ionicons";
import { arrowBack, eye, eyeOff } from "ionicons/icons";
import { NgIf } from "@angular/common";
import { CommonModule } from "@angular/common";
import { AuthService } from '../services/auth.service';
import { Registro } from '../modelos/Registro';
import { LoginService } from "../services/login.service";
import { ToastOkService } from "../services/toast-ok.service";
import { ToastErrorService } from "../services/toast-error.service";

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    RouterLink,
    NavbarComponent,
    NgIf,
    CommonModule
  ]
})

export class InicioSesionComponent implements OnInit {

  isRegistro: boolean = false;
  passwordFieldType: string = 'password';
  nombre: string = '';
  apellido: string = '';
  ubicacion: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  imagen: string = '';
  role: string = '1';
  provincias: string[] = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz',
    'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón',
    'Ciudad Real', 'Córdoba', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'La Coruña',
    'La Rioja', 'Las Palmas', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga',
    'Murcia', 'Navarra', 'Orense', 'Palencia', 'Pontevedra', 'Salamanca',
    'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Tenerife', 'Teruel', 'Toledo',
    'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
  ];

  constructor(
    private navController: NavController,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
    private platform: Platform,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) {
    addIcons({
      'arrowBack': arrowBack,
      'eye-off': eyeOff,
      'eye': eye
    });
  }

  ngOnInit() {
    if (this.platform.is('hybrid')) {
      Keyboard.setScroll({ isDisabled: true });
    }
  }

  goBack() {
    this.navController.back();
  }

  cambioRegistro() {
    this.isRegistro = !this.isRegistro;
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  login(): void {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.loginService.login(loginData).subscribe({
      next: response => {
        this.authService.setToken(response.token);
        this.loginService.setAuthState(true);
        this.toastOkService.presentToast('Sesión iniciada con éxito', 2000, 'ok');
        this.router.navigate(['/productos']);
      },
      error: err => {
        this.toastErrorService.presentToast('Contraseña o usuario incorrecto', 2000, 'error');
      }
    });
  }

  register(): void {
    const registro: Registro = {
      nombre: this.nombre,
      apellido: this.apellido,
      ubicacion: this.ubicacion,
      email: this.email,
      imagen: this.imagen,
      username: this.username,
      password: this.password,
      rol: this.role
    };

    this.loginService.register(registro).subscribe({
      next: () => {
        this.toastOkService.presentToast('Registro exitoso', 3000, 'ok');
        this.cambioRegistro();
      },
      error: err => {
        this.toastErrorService.presentToast('Error al registrarse', 3000, 'error');
      }
    });
  }
}
