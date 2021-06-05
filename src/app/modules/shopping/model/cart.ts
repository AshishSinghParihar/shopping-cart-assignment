import { CartItem } from './cart-item';
import { Product } from './product';

export class Cart {
  cartItems: CartItem[];
  noOfItems: number;
  cartPrice: number;

  constructor() {
    this.cartItems = [];
    this.cartPrice = 0;
    this.noOfItems = 0;
  }

  addItemToCart(product: Product) {
    let index = -1;

    for (let i = 0; i < this.cartItems.length; i++) {
      const item: CartItem = this.cartItems[i];
      if (item.matchesProduct(product)) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      const item = new CartItem(product);
      this.cartItems.push(item);
    } else {
      this.cartItems[index].noOfProducts++;
    }

    this.noOfItems++;
    this.cartPrice += product.price;
  }

  decreaseCartItem(productId: string) {
    let product = new Product({});
    let cartIndex: number = -1;
    let cartItemToBeDeleted;

    for (let i = 0; i < this.cartItems.length; i++) {
      const item: CartItem = this.cartItems[i];
      product = new Product(item.product);
      if (item.product.id === productId) {
        item.decreaseItem();

        cartIndex = i;
        if (item.noOfProducts === 0) {
          cartItemToBeDeleted = item;
        }
        break;
      }
    }

    if (cartItemToBeDeleted) {
      this.cartItems.splice(cartIndex, 1);
    }

    this.noOfItems--;
    this.cartPrice -= product.price;
  }

  getCartDetails() {
    return (
      'The cart contains ' +
      this.noOfItems +
      'items with a total price of rupees ' +
      this.cartPrice
    );
  }
}
