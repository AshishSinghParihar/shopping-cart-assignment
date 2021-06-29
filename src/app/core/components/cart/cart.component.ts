import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CommonUtilService } from 'src/app/core/services/common-util/common-util.service';

/**
 * CartComponent is where the products added to cart by user are available.
 * User can add more products or remove from the products colleactoin in the cart.
 *
 * The component shows total number of items in cart and their indivudual as well as total price.
 */
@Component({
  selector: 'app-products-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  /**
   * Dependencies are injected in the constructor
   *
   * @param router {Router} Used to navigate from one path to another
   * @param utilService {CommonUtilService} Used to envoke common/shared functions
   * @param dialogRef {MatDialogRef} Stores the reference of `CartComponent`
   * which is available as a dialog box
   * @param data {MAT_DIALOG_DATA} Stores the data being passed from the parent component to the dialog box
   */
  constructor(
    private router: Router,
    public utilService: CommonUtilService,
    @Optional() private dialogRef: MatDialogRef<CartComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { isBigScreen: boolean }
  ) {}

  /**
   * @ignore
   */
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
   * calls the `removeItemFromCart()` method in CommonUtilService in order to remove the
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
   * calls the `addItemToCart()` method in CommonUtilService in order to add the
   * selected item from cart and also remove it from the available stocks of that product.
   *
   * @param productId {string} Id of the product
   */
  increaseCartItem(productId: string) {
    this.utilService.addItemToCart(this.utilService.getProductById(productId));
  }

  /**
   * This method closes the CartComponent dialog box.
   */
  closeDialog() {
    this.dialogRef.close();
  }
}
