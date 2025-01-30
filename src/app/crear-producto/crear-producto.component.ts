import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgForOf } from "@angular/common";
import { Producto } from "../modelos/Producto";
import { ProductosService } from '../services/productos.service';

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
export class CrearProductoComponent implements OnInit {
  imagePath: string = '';
  perfilId: number = 1;

  producto: Producto = {
    id: 0,
    nombre: '',
    categoria: '',
    descripcion: '',
    precio: 0,
    estado: '',
    imagen: '',
    vendido: false,
    perfil: 1
  };

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService
  ) { }

  ngOnInit() {}

  onCategoriaChange(event: any) {
    this.producto.categoria = event.detail.value;
  }

  onEstadoChange(estado: string) {
    this.producto.estado = estado;
  }

  crearProducto() {
    this.producto.imagen = this.imagePath;
    this.productosService.guardarProducto(this.perfilId, this.producto).subscribe({
      next: () => {
        console.log('Producto creado exitosamente');
        this.router.navigate(['/productos']);
      },
      error: err => {
        console.error('Error al crear el producto', err);
      }
    });
  }
}
