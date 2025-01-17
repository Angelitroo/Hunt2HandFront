import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'iniciosesion',
    loadComponent: () => import('./iniciosesion/iniciosesion.component').then((m) => m.IniciosesionComponent),
  },
  {
    path: '',
    redirectTo: 'iniciosesion',
    pathMatch: 'full',
  },
  {
    path: 'navbar',
    loadComponent: () => import('./navbar/navbar.component').then((m) => m.NavbarComponent),
  },
  {
    path: 'paneladmin',
    loadComponent: () => import('./paneladmin/paneladmin.component').then((m) => m.PaneladminComponent),
  },

  {
    path: 'buscadormenu',
    loadComponent: () => import('./buscadormenu/buscadormenu.component').then((m) => m.BuscadormenuComponent),
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
  }
];
