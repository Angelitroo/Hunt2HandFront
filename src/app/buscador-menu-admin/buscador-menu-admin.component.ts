import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';

@Component({
  selector: 'app-buscador-menu-admin',
  templateUrl: './buscador-menu-admin.component.html',
  styleUrls: ['./buscador-menu-admin.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class BuscadorMenuAdminComponent implements OnInit {
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
