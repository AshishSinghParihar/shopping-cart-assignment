import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsCartComponent } from './core/components/products-cart/products-cart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'cart',
    component: ProductsCartComponent,
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/shopping/shopping.module').then(
        (m) => m.ShoppingModule
      ),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./core/modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
