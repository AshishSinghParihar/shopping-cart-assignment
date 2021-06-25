import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cart } from 'src/app/shopping/model/cart';
import { Product } from 'src/app/shopping/model/product';

@Injectable({
  providedIn: 'root',
})
export class CommonUtilService {
  selectedCategoryEmitter = new BehaviorSubject<string>('');
  private _productCart = new Cart();
  private _allProducts: Product[] = [];

  constructor(private router: Router, private _snackBar: MatSnackBar) {}

  get allProducts(): Product[] {
    return this._allProducts;
  }

  set allProducts(products: Product[]) {
    this._allProducts = products;
  }

  get productCart(): Cart {
    return this._productCart;
  }

  isApplicationOnline() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }

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

  getProductById(productId: string) {
    return this.allProducts.filter((prod: Product) => prod.id === productId)[0];
  }

  isInStock(productId: string) {
    const filteredProduct = this.getProductById(productId);
    if (filteredProduct.stock > 0) {
      return true;
    } else {
      this.openSnackBar('Product out of stock', 'Okay', {
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
      return false;
    }
  }

  addItemToCart(product: Product) {
    if (this.isInStock(product.id)) {
      this.productCart.addItemToCart(product);
      this.reduceFromProductStock(product.id);
    }
  }

  private reduceFromProductStock(productId: string) {
    const filteredProduct = this.getProductById(productId);
    filteredProduct.stock--;
  }

  removeItemFromCart(product: Product) {
    this.productCart.decreaseCartItem(product.id);
    this.addToProductStock(product.id);
  }

  private addToProductStock(productId: string) {
    const filteredProduct = this.getProductById(productId);
    filteredProduct.stock++;
  }

  openSnackBar(message: string, action: string, options = {}) {
    options = Object.assign(
      { duration: 3000, panelClass: ['success-snackbar'] },
      options
    );
    this._snackBar.open(message, action, options);
  }

  showErrorPage() {
    this.router.navigate(['error']);
  }
}
