import { Component, OnInit } from '@angular/core';
import {IonicModule, NavController} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import { Keyboard } from '@capacitor/keyboard';
import {Router, RouterLink} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {addIcons} from "ionicons";
import {arrowBack, eye, eyeOff} from "ionicons/icons";
import {NgIf} from "@angular/common";

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

  constructor(private navController: NavController, private router: Router) {
    addIcons({
      'arrowBack': arrowBack,
      'eye-off': eyeOff,
      'eye': eye});
  }

  ngOnInit() {Keyboard.setScroll({ isDisabled: true });}

  goBack() {
    this.navController.back();
  }

  cambioRegistro() {
    this.isRegistro = !this.isRegistro;
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
