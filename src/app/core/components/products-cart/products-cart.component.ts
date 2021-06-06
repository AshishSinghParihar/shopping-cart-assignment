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
  constructor(
    private router: Router,
    public utilService: UtilService,
    @Optional() private dialogRef: MatDialogRef<ProductsCartComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { isBigScreen: boolean }
  ) {}

  ngOnInit(): void {}

  goToPLP() {
    this.router.navigate(['products/plp']);
    this.closeDialog();
  }

  decreaseCartItem(productId: string) {
    this.utilService.removeItemFromCart(
      this.utilService.getProductById(productId)
    );
  }

  increaseCartItem(productId: string) {
    this.utilService.addItemToCart(this.utilService.getProductById(productId));
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
