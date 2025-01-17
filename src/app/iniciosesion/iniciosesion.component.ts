import { Component, OnInit } from '@angular/core';
import {IonicModule, NavController} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import { Keyboard } from '@capacitor/keyboard';
import {Router, RouterLink} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {addIcons} from "ionicons";
import {arrowBack} from "ionicons/icons";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    RouterLink,
    NavbarComponent,
    NgIf,
  ]
})
export class IniciosesionComponent  implements OnInit {
  username: string = '';
  password: string = '';
  isRegistro: boolean = false;


  constructor(private navController: NavController, private router: Router) {
    addIcons({ arrowBack });
  }

  ngOnInit() {Keyboard.setScroll({ isDisabled: true });}

  goBack() {
    this.navController.back();
  }

  cambioRegistro() {
    this.isRegistro = !this.isRegistro;
  }
}
