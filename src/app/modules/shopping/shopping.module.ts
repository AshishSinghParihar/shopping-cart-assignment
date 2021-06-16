import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsListingPageComponent } from './products-listing-page/products-listing-page.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsRoutingModule } from './shopping-routing.module';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    ProductsListingPageComponent,
    ProductsHomeComponent,
    ProductCardComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, NgbModule],
})
export class ShoppingModule {}
