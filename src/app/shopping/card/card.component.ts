import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../core/model/product';

/**
 * `CardComponent` is used to display the details of each product on Product Listing Page.
 * It shows the details of a product and has a `Buy Now` button, by clicking on which
 * a user can add the product to cart.
 */
@Component({
  selector: 'app-product-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  /**
   * `productDetail` is the object containing details of product to be displayed.
   */
  @Input() productDetail: Product;

  /**
   * When `Buy Now` button is clicked, an event is emitted to the parent of `CardComponent`
   * to handle the oevent to add selected product into the cart.
   */
  @Output() addToCartEmitter = new EventEmitter<Product>();

  /**
   * @ignore
   */
  constructor() {}

  /**
   * @ignore
   */
  ngOnInit(): void {}

  /**
   * When `Buy Now` button is clicked, this method is called.
   * It is responsible for emitting the `productDetail` object to the parent component.
   */
  onBuyButtonClick() {
    this.addToCartEmitter.emit(this.productDetail);
  }
}
