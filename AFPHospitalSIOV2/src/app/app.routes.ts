import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'lista-pz',
    loadComponent: () => import('./feature/lista-pz/lista-pz.component')
      .then(m => m.ListaPzComponent),
    pathMatch: 'full'
  },
  {
    path: 'accetta-scelta',
    loadComponent: () => import('./feature/scelta-accettazione/scelta-accettazione.component')
      .then(m => m.SceltaAccettazioneComponent),
    pathMatch: 'full'
  },
  {
    path: 'accetta-pz',
    loadComponent: () => import('./feature/accetta-pz/accetta-pz.component')
      .then(m => m.AccettaPzComponent),
    pathMatch: 'full'
  },
  {
    path: 'modifica-pz',
    loadComponent: () => import('./feature/modifica-pz/modifica-pz.component')
      .then(m => m.ModificaPzComponent),
    pathMatch: 'full'
  },
  {
    path: 'accetta-trasferta',
    loadComponent: () => import('./feature/accetta-trasferta/accetta-trasferta.component')
      .then(m => m.AccettaTrasfertaComponent),
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'lista-pz',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'lista-pz',
    pathMatch: 'full'
  }
];
