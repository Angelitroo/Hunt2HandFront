import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ProductosService } from "../services/productos.service";
import { PerfilesService } from "../services/perfiles.service";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { IonicModule } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  imports: [
    MenuInferiorComponent,
    IonicModule,
    NgIf,
    RouterLink
  ],
  standalone: true
})
export class ProductoComponent implements OnInit {
  producto: any;
  perfil: any;

  constructor(
    private productosService: ProductosService,
    private perfilService: PerfilesService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getProductoById(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.loadPerfil(data.perfil); // Assuming `data.perfil` contains the profile ID
      },
      error: (err) => {
        console.error('Error fetching producto by id', err);
      }
    });
  }

  loadPerfil(perfilId: number) {
    this.perfilService.getPerfilById(perfilId).subscribe({
      next: (data) => {
        this.perfil = data;
      },
      error: (err) => {
        console.error('Error fetching perfil by id', err);
      }
    });
  }
}
