import { Component, OnInit } from '@angular/core';
import {MenuInferiorComponent} from "../menu-inferior/menu-inferior.component";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    MenuInferiorComponent,
    IonicModule
  ]
})
export class ChatComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
