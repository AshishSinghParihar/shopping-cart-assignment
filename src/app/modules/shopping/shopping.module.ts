import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsListingPageComponent } from './products-listing-page/products-listing-page.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { ProductsCartComponent } from './products-cart/products-cart.component';
import { ProductsRoutingModule } from './shopping-routing.module';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    ProductsListingPageComponent,
    ProductsHomeComponent,
    ProductsCartComponent,
    ProductCardComponent
  ],
  imports: [CommonModule, ProductsRoutingModule, CarouselModule, NgbModule],
})
export class ShoppingModule {}
