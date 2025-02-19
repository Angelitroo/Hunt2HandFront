import {Component, HostListener, OnInit} from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { MenuInferiorComponent } from "../menu-inferior/menu-inferior.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import { Producto } from "../modelos/Producto";
import { ProductosService } from '../services/productos.service';
import { AuthService } from "../services/auth.service";
import { ToastOkService } from '../services/toast-ok.service';
import { ToastErrorService } from '../services/toast-error.service';
import {MenuLateralComponent} from "../menu-lateral/menu-lateral.component";

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss'],
  standalone: true,
    imports: [
        IonicModule,
        FormsModule,
        NgForOf,
        MenuInferiorComponent,
        NgIf,
        MenuLateralComponent
    ]
})
export class CrearProductoComponent implements OnInit {
  imagePath: string = '';
  isScreenSmall: boolean = false;
  modoCrear: boolean = false;
  modoEditar: boolean = false;
  modoEditarAdmin: boolean = false;

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
    'Vehiculos',
    'Ropa',
    'Electrodomesticos',
    'Tecnologia',
    'Deportes',
    'Hogar',
    'Jardineria',
    'Mascotas',
    'Otros',
    'Juguetes',
    'Libros',
    'Muebles',
    'Belleza',
    'Salud',
    'Herramientas',
    'Musica',
    'Arte',
    'Coleccionables',
    'Bebes',
    'Alimentos y bebidas'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productosService: ProductosService,
    private authService: AuthService,
    private toastOkService: ToastOkService,
    private toastErrorService: ToastErrorService,
  ) { }

  ngOnInit() {
    this.checkScreenSize();
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (!productId) {
        this.modoCrear = true;
        this.modoEditar = false;
        this.modoEditarAdmin = false;

      }

      if (productId) {
        this.modoCrear = false;
        this.modoEditar = true;
        this.modoEditarAdmin = false;
        this.loadProductDetails(productId);
      }

      this.route.queryParams.subscribe(queryParams => {
        if (queryParams['admin'] === 'true') {
          this.modoCrear = false;
          this.modoEditar = false;
          this.modoEditarAdmin = true;
        }
      });
    });
  }

  loadProductDetails(id: number): void {
    this.productosService.getProductoById(id).subscribe({
      next: (producto) => {
        this.producto = producto;
        this.imagePath = producto.imagen;
      },
      error: (err) => {
        this.toastErrorService.presentToast('Error al cargar el producto', 3000);
      }
    });
  }

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
          this.router.navigate(['/productos']).then(() => {
            window.location.reload();
          });
          this.toastOkService.presentToast('Producto creado con éxito', 3000);
        },
        error: err => {
          this.toastErrorService.presentToast('Error al crear el producto', 3000);
        }
      });
    }
  }

  modificarProducto(): void {
    if (this.producto.id) {
      this.productosService.modificarProducto(this.producto.id, this.producto).subscribe({
        next: () => {
          this.router.navigate(['/perfil']).then(() => {
            window.location.reload();
          });
          this.toastOkService.presentToast('Producto modificado con éxito', 3000);
        },
        error: err => {
          this.toastErrorService.presentToast('Error al modificar el producto', 3000);
        }
      });
    } else {
      this.toastErrorService.presentToast('ID de producto no encontrado', 3000);
    }
  }

  modificarProductoAdmin(): void {
    if (this.producto.id) {
      this.productosService.modificarProducto(this.producto.id, this.producto).subscribe({
        next: () => {
          this.router.navigate(['/panel-admin-productos']).then(() => {
            window.location.reload();
          });
          this.toastOkService.presentToast('Producto modificado con éxito', 3000);
        },
        error: err => {
          this.toastErrorService.presentToast('Error al modificar el producto', 3000);
        }
      });
    } else {
      this.toastErrorService.presentToast('ID de producto no encontrado', 3000);
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isScreenSmall = window.innerWidth < 1024;
  }
}
