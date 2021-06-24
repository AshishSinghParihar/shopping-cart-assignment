import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss'],
})
export class ProductsCartComponent implements OnInit {
  /**
   * Dependencies are injected the constructor
   *
   * @param router {Router} Used to navigate from one path to another
   * @param utilService {UtilService} Used to envoke common/shared functions
   * @param dialogRef {MatDialogRef} Stores the reference of `ProductsCartComponent`
   * which is available as a dialog box
   * @param data {MAT_DIALOG_DATA} Stores the data being passed from the parent component to the dialog box
   */
  constructor(
    private router: Router,
    public utilService: UtilService,
    @Optional() private dialogRef: MatDialogRef<ProductsCartComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { isBigScreen: boolean }
  ) {}

  ngOnInit(): void {}

  /**
   * This method navigates to Products listing page and closes the dialog box.
   */
  goToPLP() {
    this.router.navigate(['products/plp']);
    this.closeDialog();
  }

  /**
   * This method is called when 'minus' button is clicked on an item, which in turn
   * calls the `removeItemFromCart()` method in UtilService in order to remove the
   * selected item from cart and also add it to the available stocks of that product.
   *
   * @param productId {string} Id of the product
   */
  decreaseCartItem(productId: string) {
    this.utilService.removeItemFromCart(
      this.utilService.getProductById(productId)
    );
  }

  /**
   * This method is called when 'plus' button is clicked on an item, which in turn
   * calls the `addItemToCart()` method in UtilService in order to add the
   * selected item from cart and also remove it from the available stocks of that product.
   *
   * @param productId {string} Id of the product
   */
  increaseCartItem(productId: string) {
    this.utilService.addItemToCart(this.utilService.getProductById(productId));
  }

  /**
   * This method closes the ProductsCartComponent dialog box.
   */
  closeDialog() {
    this.dialogRef.close();
  }
}
