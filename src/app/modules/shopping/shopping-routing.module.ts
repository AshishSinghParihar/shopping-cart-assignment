import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsListingPageComponent } from './products-listing-page/products-listing-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsHomeComponent,
  },
  {
    path: 'plp',
    component: ProductsListingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
