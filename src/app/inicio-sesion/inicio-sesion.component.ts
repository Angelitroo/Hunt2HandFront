import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController, Platform } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { Keyboard } from '@capacitor/keyboard';
import { Router, RouterLink } from "@angular/router";
import { NavbarComponent } from "../navbar/navbar.component";
import { addIcons } from "ionicons";
import { arrowBack, eye, eyeOff } from "ionicons/icons";
import { NgIf } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Registro } from '../modelos/Registro';

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
  ]
})

export class InicioSesionComponent implements OnInit {
  username: string = '';
  password: string = '';
  isRegistro: boolean = false;
  passwordFieldType: string = 'password';
  nombre: string = '';
  apellidos: string = '';
  mail: string = '';
  fechaNacimiento: string = '';
  dni: string = '';

  constructor(
    private navController: NavController,
    private router: Router,
    private http: HttpClient,
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

    this.http.post<{ token: string }>('/api/auth/login', loginData).subscribe({
      next: response => {
        console.log('Login successful, received token:', response.token);
        this.authService.setToken(response.token);
        console.log('Token saved to local storage:', this.authService.getToken());
        this.router.navigate(['/publicaciones']);
      },
      error: err => {
        console.error('Error de inicio de sesión', err);
      }
    });
  }

  register(): void {
    const registro: Registro = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      mail: this.mail,
      fechaNacimiento: this.fechaNacimiento,
      dni: this.dni,
      username: this.username,
      password: this.password
    };

    this.http.post('api/auth/register', registro).subscribe({
      next: () => {
        this.cambioRegistro();
      },
      error: err => {
        console.error('Error al registrar', err);
      }
    });
  }
}
