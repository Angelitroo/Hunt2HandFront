import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio-sesion',
    loadComponent: () => import('./inicio-sesion/inicio-sesion.component').then((m) => m.InicioSesionComponent),
  },
  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full',
  },
  {
    path: 'navbar',
    loadComponent: () => import('./navbar/navbar.component').then((m) => m.NavbarComponent),
  },
  {
    path: 'panel-admin',
    loadComponent: () => import('./panel-admin/panel-admin.component').then((m) => m.PanelAdminComponent),
  },
  {
    path: 'buscador-menu',
    loadComponent: () => import('./buscador-menu/buscador-menu.component').then((m) => m.BuscadorMenuComponent),
  },
  {
    path: 'buscador-menu-admin',
    loadComponent: () => import('./buscador-menu-admin/buscador-menu-admin.component').then((m) => m.BuscadorMenuAdminComponent),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.component').then((m) => m.PerfilComponent),
  },
  {
    path: 'perfil/:id',
    loadComponent: () => import('./perfil/perfil.component').then((m) => m.PerfilComponent),
  },
  {
    path: 'productos',
    loadComponent: () => import('./productos/productos.component').then((m) => m.ProductosComponent),
  },
  {
    path: 'menu-inferior',
    loadComponent: () => import('./menu-inferior/menu-inferior.component').then((m) => m.MenuInferiorComponent),
  },
  {
    path: 'menu-inferior-admin',
    loadComponent: () => import('./menu-inferior-admin/menu-inferior-admin.component').then((m) => m.MenuInferiorAdminComponent),
  },
  {
    path: 'panel-admin-productos',
    loadComponent: () => import('./panel-admin-publicaciones/panel-admin-publicaciones.component').then((m) => m.PanelAdminPublicacionesComponent),
  },
  {
    path: 'panel-admin-perfiles',
    loadComponent: () => import('./panel-admin-perfiles/panel-admin-perfiles.component').then((m) => m.PanelAdminPerfilesComponent),
  },
  {
    path: 'panel-admin-reportes',
    loadComponent: () => import('./panel-admin-reportes/panel-admin-reportes.component').then((m) => m.PanelAdminReportesComponent),
  },
  {
    path: 'productos/:id',
    loadComponent: () => import('./producto/producto.component').then((m) => m.ProductoComponent),
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./favoritos/favoritos.component').then((m) => m.FavoritosComponent),
  }
  ,
  {
    path: 'crear-producto',
    loadComponent: () => import('./crear-producto/crear-producto.component').then((m) => m.CrearProductoComponent),
  },

  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.component').then((m) => m.ChatComponent),
  },

  {
    path: 'dentro-chat/:id_chat/:id_receptor',
    loadComponent: () => import('./dentro-chat/dentro-chat.component').then((m) => m.DentroChatComponent),
  },

  {
    path: 'modificar-perfil',
    loadComponent: () => import('./modificar-perfil/modificar-perfil.component').then((m) => m.ModificarPerfilComponent),
  },
  {
    path: 'recuperar-contrasena',
    loadComponent: () => import('./recuperar-contrasena/recuperar-contrasena.component').then((m) => m.RecuperarContrasenaComponent),
  },
  {
    path: 'restablecer-contrasena',
    loadComponent: () => import('./restablecer-contrasena/restablecer-contrasena.component').then((m) => m.RestablecerContrasenaComponent),
  },
];
