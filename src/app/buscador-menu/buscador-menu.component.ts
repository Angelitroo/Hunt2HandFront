import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

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
  @Output() searchEvent = new EventEmitter<{ searchValue: any, url: any }>();

  constructor(private router: Router) { }

  ngOnInit() {}

  onSearchChange(event: any) {
    const searchValue = event.target.value;
    const url = this.router.url;
    this.searchEvent.emit({ searchValue, url });
  }
}
