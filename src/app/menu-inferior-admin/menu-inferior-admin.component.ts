import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {people, documentText, warning} from "ionicons/icons";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-menu-inferior-admin',
  templateUrl: './menu-inferior-admin.component.html',
  styleUrls: ['./menu-inferior-admin.component.scss'],
  imports: [
    IonicModule,
    RouterLink
  ],
  standalone: true
})
export class MenuInferiorAdminComponent  implements OnInit {

  constructor() {
    addIcons({
      'people': people,
      'documentText': documentText,
      'warning': warning
    });
  }

  ngOnInit() {}

}
