import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-activar-cuenta',
  templateUrl: './activar-cuenta.component.html',
  styleUrls: ['./activar-cuenta.component.scss'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class ActivarCuentaComponent implements OnInit {
  token: string | null = null;
  perfilId: number | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.perfilId = this.authService.getPerfilIdFromToken();

    this.token = this.route.snapshot.queryParamMap.get('token');
    if (this.token) {
      this.authService.activarCuenta(this.token).subscribe(
        response => {
          console.log('Cuenta activada exitosamente');
        },
        error => {
          console.error('Error al activar la cuenta', error);
        }
      );
    }
  }
}
