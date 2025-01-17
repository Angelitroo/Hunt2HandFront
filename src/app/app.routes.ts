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
];
