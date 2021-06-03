import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Cart } from 'src/app/modules/shopping/model/cart';
import { Product } from 'src/app/modules/shopping/model/product';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  productCart = new Cart();
  allProducts: Product[] = [];

  constructor(private _snackBar: MatSnackBar) {}

  filterAndSortCategories(categories: any) {
    return categories
      .filter((record: any) => record.enabled === true)
      .sort(function (first: any, second: any) {
        if (first.order > second.order) {
          return 1;
        }
        if (first.order < second.order) {
          return -1;
        }
        return 0;
      });
  }

  isInStock(productId: string) {
    const filteredProduct = this.allProducts.filter(
      (prod: Product) => prod.id === productId
    )[0];
    return filteredProduct.stock > 0;
  }

  addItemToCart(product: Product) {
    this.productCart.addItemToCart(product);
    this.reduceFromProductStock(product.id);
  }

  reduceFromProductStock(productId: string) {
    const filteredProduct = this.allProducts.filter(
      (prod: Product) => prod.id === productId
    )[0];
    filteredProduct.stock--;
  }

  addToProductStock(productId: string) {
    const filteredProduct = this.allProducts.filter(
      (prod: Product) => prod.id === productId
    )[0];
    filteredProduct.stock++;
  }

  openSnackBar(message: string, action: string, options = {}) {
    options = Object.assign(
      { duration: 3000, panelClass: ['success-snackbar'] },
      options
    );
    this._snackBar.open(message, action, options);
  }
}
