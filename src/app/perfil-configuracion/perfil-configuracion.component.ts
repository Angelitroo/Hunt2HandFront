import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {eyeOff, eye} from "ionicons/icons";
import {MenuInferiorComponent} from "../menu-inferior/menu-inferior.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-perfil-configuracion',
  templateUrl: './perfil-configuracion.component.html',
  styleUrls: ['./perfil-configuracion.component.scss'],
  imports: [
    IonicModule,
    MenuInferiorComponent,
    FormsModule
  ],
  standalone: true
})

export class PerfilConfiguracionComponent  implements OnInit {
  passwordFieldType: string = 'password';
  password: string = '';
  avatarSrc: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  constructor() {
    addIcons({
      'eye-off': eyeOff,
      'eye': eye
    })
  }

  ngOnInit() {}

  onAvatarClick() {
    const fileInput = document.getElementById('avatarInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    } else {
      console.error('No se encontró el elemento con el ID avatarInput');
    }
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarSrc = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
