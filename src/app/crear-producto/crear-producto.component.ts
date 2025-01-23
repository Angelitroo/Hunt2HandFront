import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {MenuInferiorComponent} from "../menu-inferior/menu-inferior.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    MenuInferiorComponent,
    RouterLink
  ]
})
export class CrearProductoComponent  implements OnInit {
  imagePath: string = '';
  constructor() { }

  ngOnInit() {}

}
