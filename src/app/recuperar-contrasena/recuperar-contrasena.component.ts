import { Component } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from '../services/auth.service';
import { ToastOkService } from "../services/toast-ok.service";
import { ToastErrorService } from "../services/toast-error.service";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    NavbarComponent
  ]
})
export class RecuperarContrasenaComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService,
    private router: Router
  ) {}

  recuperarContrasena() {
    this.authService.recuperarContrasena(this.email).subscribe({
      next: () => {
        this.router.navigate(['/inicio-sesion']);
      },
    });
  }
}
