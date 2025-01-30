import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import {MenuInferiorComponent} from "../menu-inferior/menu-inferior.component";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
  standalone: true,
    imports: [
        IonicModule,
        FormsModule,
        MenuInferiorComponent,
        RouterLink,
        NgForOf
    ]
})
export class CrearProductoComponent  implements OnInit {
  imagePath: string = '';
  categorias: string[] = [
    'Vehículos',
    'Ropa',
    'Electrodomésticos',
    'Tecnología',
    'Deportes',
    'Hogar',
    'Jardinería',
    'Mascotas',
    'Otros',
    'Juguetes',
    'Libros',
    'Muebles',
    'Belleza',
    'Salud',
    'Herramientas',
    'Música',
    'Arte',
    'Coleccionables',
    'Bebés',
    'Alimentos y bebidas'
  ];



  constructor() { }

  ngOnInit() {}

}
