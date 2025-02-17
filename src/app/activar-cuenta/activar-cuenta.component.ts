import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonicModule, LoadingController } from "@ionic/angular";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';

@Component({
  selector: 'app-activar-cuenta',
  templateUrl: './activar-cuenta.component.html',
  styleUrls: ['./activar-cuenta.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class ActivarCuentaComponent implements OnInit {
  token: string | null = null;
  perfilId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) {}

  async ngOnInit(): Promise<void> {
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (this.token) {
      const loading = await this.loadingController.create({
        message: 'Activando cuenta...'
      });
      await loading.present();

      this.perfilId = this.authService.getIdActivarCuenta(this.token);
      if (this.perfilId) {
        this.authService.activarCuenta(this.perfilId).subscribe(
          async response => {
            await loading.dismiss();
            this.toastOkService.presentToast('Cuenta activada correctamente', 3000);
            window.close();
          },
          async error => {
            await loading.dismiss();
            this.toastErrorService.presentToast('Error al activar la cuenta', 3000);
            window.close();
          }
        );
      } else {
        await loading.dismiss();
        this.toastErrorService.presentToast('Error al activar la cuenta', 3000);
        window.close();
      }
    }
  }
}
