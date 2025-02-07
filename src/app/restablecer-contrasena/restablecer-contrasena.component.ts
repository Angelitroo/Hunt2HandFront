import { Component } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from '../services/auth.service';
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.component.html',
  styleUrls: ['./restablecer-contrasena.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    NavbarComponent
  ]
})
export class RestablecerContrasenaComponent {
  nuevaContrasena: string = '';
  token: string = '';

  constructor(
    private authService: AuthService,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParams['token'];
  }

  restablecerContrasena() {
    this.authService.restablecerContrasena(this.token, this.nuevaContrasena).subscribe({
      next: () => {
        this.router.navigate(['/inicio-sesion']);
      },
    });
  }
}
