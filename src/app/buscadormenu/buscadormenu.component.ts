import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-buscadormenu',
  templateUrl: './buscadormenu.component.html',
  styleUrls: ['./buscadormenu.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class BuscadormenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
