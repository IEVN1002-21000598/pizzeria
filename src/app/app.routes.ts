import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'pizzeria',
    component: AppComponent,
    loadChildren: () => import('./componentes/auth.routes')
  },

  {
    path:'*',
    redirectTo: ''
  }
];
