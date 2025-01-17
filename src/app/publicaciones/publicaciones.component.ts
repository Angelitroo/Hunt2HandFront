import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class PublicacionesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
