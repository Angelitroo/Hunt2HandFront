import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class PerfilComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
