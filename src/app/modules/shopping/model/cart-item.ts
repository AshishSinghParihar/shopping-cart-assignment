import { Product } from './product';

export class CartItem {
  product: Product;
  noOfProducts: number;

  constructor(product: Product) {
    this.product = product;
    this.noOfProducts = 1;
  }

  matchesProduct(product: Product) {
    return (
      this.product.category === product.category &&
      this.product.id === product.id
    );
  }

  decreaseItem() {
    this.noOfProducts--;
  }

  increaseItem() {
    this.noOfProducts++;
  }
}
