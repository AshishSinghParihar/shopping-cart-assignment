import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../model/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() productDetail: any;

  @Output() addToCartEmitter = new EventEmitter<Product>();
  @Output() newItemEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onBuyButtonClick() {
    this.addToCartEmitter.emit(this.productDetail);
  }
}
