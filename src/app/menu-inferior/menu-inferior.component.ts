import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-menu-inferior',
  templateUrl: './menu-inferior.component.html',
  styleUrls: ['./menu-inferior.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class MenuInferiorComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
