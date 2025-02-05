import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReseñaServiceService } from '../services/reseña-service.service';
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { IonicModule } from "@ionic/angular";
import { NgClass } from "@angular/common";
import { Perfil } from "../modelos/Perfil";
import { PerfilesService } from "../services/perfiles.service";
import { addIcons } from "ionicons";
import { send, star } from "ionicons/icons";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';

@Component({
  selector: 'app-dentro-chat',
  templateUrl: './dentro-chat.component.html',
  styleUrls: ['./dentro-chat.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    MenuInferiorComponent,
    NgClass
  ]
})
export class DentroChatComponent implements OnInit {
  estrellaSeleccionada: number = 0;
  estrellasSeleccionadas: { [key: number]: boolean } = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  };
  idPerfilValorado: number = 2;
  idPerfilValorador: number = 1;
  yaValorado: boolean = false;
  nombreUsuario: string = '';

  constructor(
    private route: ActivatedRoute,
    private reseñaService: ReseñaServiceService,
    private perfilService: PerfilesService,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) {
    addIcons({
      'star': star,
      'send': send
    });
  }

  ngOnInit() {
    this.idPerfilValorado = +this.route.snapshot.paramMap.get('id_valorado')!;
    this.idPerfilValorador = +this.route.snapshot.paramMap.get('id_valorador')!;
    const valorado = localStorage.getItem('yaValorado');
    const estrellaGuardada = localStorage.getItem('estrellaSeleccionada');

    if (valorado === 'true') {
      this.yaValorado = true;
    }
    if (estrellaGuardada) {
      this.estrellaSeleccionada = +estrellaGuardada;
      this.establecerEstrellasSeleccionadas(this.estrellaSeleccionada);
    }

    this.perfilService.getPerfilById(this.idPerfilValorado).subscribe(
      (perfil: Perfil) => {
        this.nombreUsuario = perfil.nombre;
        this.toastOkService.presentToast('Perfil cargado con éxito', 3000);
      },
      error => {
        this.toastErrorService.presentToast('Error obteniendo el perfil', 3000);
      }
    );
  }

  abrirValoracion(numero: number) {
    if (this.yaValorado) return;

    const confirmacion = confirm(`¿Valorar con ${numero} estrella${numero > 1 ? 's' : ''}?`);
    if (confirmacion) {
      this.estrellaSeleccionada = numero;
      this.establecerEstrellasSeleccionadas(numero);
      this.confirmarValoracion();
      this.yaValorado = true;

      localStorage.setItem('yaValorado', 'true');
      localStorage.setItem('estrellaSeleccionada', `${this.estrellaSeleccionada}`);
    }
  }

  establecerEstrellasSeleccionadas(numero: number) {
    for (let i = 1; i <= 5; i++) {
      this.estrellasSeleccionadas[i] = i <= numero;
    }
  }

  confirmarValoracion() {
    const nuevaReseña = {
      id: 0,
      valoracion: this.estrellaSeleccionada,
      id_perfilvalorado: this.idPerfilValorado,
      id_perfilvalorador: this.idPerfilValorador
    };

    this.reseñaService.crearReseña(nuevaReseña, this.idPerfilValorador, this.idPerfilValorado)
      .subscribe({
        next: () => {
          this.toastOkService.presentToast('Valoración confirmada', 3000);
          this.yaValorado = true;
        },
        error: () => {
          this.toastErrorService.presentToast('Error al confirmar la valoración', 3000);
        }
      });
  }
}
