import { Routes } from "@angular/router";
export default[
  {
      path:'form',
      loadComponent:()=> import('./formulario/formulario.component')
  },
  {
      path:'pedido',
      loadComponent:()=> import('./formulario/formulario.component')
  },
  {
      path:'form',
      loadComponent:()=> import('./formulario/formulario.component')
  },
] as Routes
