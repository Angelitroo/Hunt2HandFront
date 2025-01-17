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
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.component').then((m) => m.PerfilComponent),
  },
  {
    path: 'publicaciones',
    loadComponent: () => import('./publicaciones/publicaciones.component').then((m) => m.PublicacionesComponent),
  },
  {
    path: 'menu-inferior',
    loadComponent: () => import('./menu-inferior/menu-inferior.component').then((m) => m.MenuInferiorComponent),
  },
  {
    path: 'panel-perfil',
    loadComponent: () => import('./panel-perfil/panel-perfil.component').then((m) => m.PanelPerfilComponent),
  }
];
