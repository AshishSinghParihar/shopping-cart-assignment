import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsListingPageComponent } from './products-listing-page/products-listing-page.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsCartComponent } from './products-cart/products-cart.component';

@NgModule({
  declarations: [
    ProductsListingPageComponent,
    ProductsHomeComponent,
    ProductsCartComponent,
  ],
  imports: [CommonModule],
})
export class ShoppingModule {}
