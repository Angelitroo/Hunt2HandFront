import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-paneladmin',
  templateUrl: './paneladmin.component.html',
  styleUrls: ['./paneladmin.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class PaneladminComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
