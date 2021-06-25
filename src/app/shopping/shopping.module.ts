import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ListingPageComponent } from './listing-page/listing-page.component';
import { HomeComponent } from './home/home.component';
import { ProductsRoutingModule } from './shopping-routing.module';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    ListingPageComponent,
    HomeComponent,
    CardComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, NgbModule],
})
export class ShoppingModule {}
