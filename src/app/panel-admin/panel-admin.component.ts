import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class PanelAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
