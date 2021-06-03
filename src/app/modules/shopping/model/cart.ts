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
    this.cartItems.forEach((item: CartItem, i: number) => {
      if (item.matchesProduct(product)) {
        index = i;
      }
    });
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


    this.cartItems.forEach((item: CartItem, index: number) => {
      product = new Product(item.product);
      if (item.product.id === productId) {
        item.decreaseItem();

        cartIndex = index;
        if (item.noOfProducts === 0) {
          cartItemToBeDeleted = item;
        }
      }
    });

    if (cartItemToBeDeleted) {
      this.cartItems.splice(cartIndex, 1);
    }

    this.noOfItems--;
    this.cartPrice -= product.price;
  }

  increaseCartItem(productId: string) {
    let product = new Product({});
    this.cartItems.forEach((item: CartItem) => {
      product = new Product(item.product);
      if (item.product.id === productId) {
        item.increaseItem();
      }
    });

    this.noOfItems++;
    this.cartPrice += product.price;
  }
}
