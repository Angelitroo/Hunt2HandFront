import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import {PublicacionesComponent} from "../publicaciones/publicaciones.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, PublicacionesComponent],
  standalone: true
})
export class HomePage {
  constructor() {}
}
