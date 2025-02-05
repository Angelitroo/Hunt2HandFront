import { Component, OnInit } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgForOf } from "@angular/common";
import { Producto } from "../modelos/Producto";
import { ProductosService } from '../services/productos.service';
import { AuthService } from "../services/auth.service";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    NgForOf,
    MenuInferiorComponent
  ]
})
export class CrearProductoComponent implements OnInit {
  imagePath: string = '';

  producto: Producto = {
    id: 0,
    nombre: '',
    categoria: '',
    descripcion: '',
    precio: 0,
    estado: '',
    imagen: '',
    vendido: false,
    perfil: 0
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
    private productosService: ProductosService,
    private authService: AuthService,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService
  ) { }

  ngOnInit() {}

  crearProducto(): void {
    const perfilId: number | undefined = this.authService.getPerfilIdFromToken() ?? undefined;
    console.log('Perfil ID:', perfilId);
    const nuevoProducto: Partial<Producto> = {
      nombre: this.producto.nombre,
      categoria: this.producto.categoria,
      descripcion: this.producto.descripcion,
      precio: this.producto.precio,
      estado: this.producto.estado,
      imagen: this.imagePath,
      vendido: false,
    };

    if (perfilId !== undefined) {
      this.productosService.guardarProducto(perfilId, nuevoProducto).subscribe({
        next: () => {
          this.router.navigate(['/productos']);
          this.toastOkService.presentToast('Producto creado con éxito', 3000);
        },
        error: err => {
          this.toastErrorService.presentToast('Error al crear el producto', 3000);
        }
      });
    } else {
      this.toastErrorService.presentToast('Error al obtener el ID del perfil', 3000);
    }
  }
}
