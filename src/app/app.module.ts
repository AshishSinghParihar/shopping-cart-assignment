import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { ProductsCartComponent } from './core/components/products-cart/products-cart.component';
import { ErrorComponent } from './core/components/error/error.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ProductsCartComponent, ErrorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
  exports: [MatSnackBarModule],
  entryComponents: [ProductsCartComponent],
})

/**
 * AppModule contains HeaderComponent and ProductsCartComponent.
 * AppModule imports common core modules being used in the application.
 * It also imports Angular Material modules.
 */
export class AppModule {}
