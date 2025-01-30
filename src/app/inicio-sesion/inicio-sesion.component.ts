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
import {LoginService} from "../services/login.service";

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
  username: string = '';
  password: string = '';
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
    private platform: Platform
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

    console.log('Datos de login:', loginData);

    this.loginService.login(loginData).subscribe({
      next: response => {
        console.log('Login successful, received token:', response.token);
        this.authService.setToken(response.token);
        this.loginService.setAuthState(true);
        console.log('Token saved to local storage:', this.authService.getToken());
        this.router.navigate(['/productos']);
      },
      error: err => {
        console.error('Error de inicio de sesión', err);
      }
    });
  }

  register(): void {
    const registro: Registro = {
      nombre: this.nombre,
      apellido: this.apellido,
      ubicacion: this.ubicacion,
      username: this.username,
      password: this.password,
      rol: this.role
    };

    console.log('Registro completado', JSON.stringify(registro));

    this.loginService.register(registro).subscribe({
      next: () => {
        this.cambioRegistro();
      },
      error: err => {
        console.error('Error al registrar', err);
      }
    });
  }
}
