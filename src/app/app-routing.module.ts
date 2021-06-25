import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './core/components/error/error.component';

import { ProductsCartComponent } from './core/components/products-cart/products-cart.component';

/**
 * The feature modules - ShoppingModule and AuthenticationModule are lazily loaded- using below routes.
 *
 * '/products' loads the ShoppingModule
 *
 * '/authentication' loads the AuthenticationModule
 *
 * '/cart' loads the ProductsCartComponent which is a part of AppModule.
 */
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
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./shopping/shopping.module').then(
        (m) => m.ShoppingModule
      ),
  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./core/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
