import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';

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

  constructor(
    private router: Router,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) { }

  ngOnInit() {}

  onSearchChange(event: any) {
    try {
      const searchValue = event.target.value;
      const url = this.router.url;
      this.searchEvent.emit({ searchValue, url });
    } catch (error) {
      this.toastErrorService.presentToast('Error al realizar la búsqueda', 3000);
    }
  }
}
