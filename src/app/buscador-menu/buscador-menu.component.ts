import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-buscador-menu',
  templateUrl: './buscador-menu.component.html',
  styleUrls: ['./buscador-menu.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class BuscadorMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
