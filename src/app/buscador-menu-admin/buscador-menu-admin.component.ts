import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-buscador-menu-admin',
  templateUrl: './buscador-menu-admin.component.html',
  styleUrls: ['./buscador-menu-admin.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class BuscadorMenuAdminComponent  implements OnInit {
  @Output() searchEvent = new EventEmitter<{ searchValue: any, url: any }>();

  constructor(private router: Router) { }

  ngOnInit() {}

  onSearchChange(event: any) {
    const searchValue = event.target.value;
    const url = this.router.url;
    this.searchEvent.emit({ searchValue, url });
  }
}
