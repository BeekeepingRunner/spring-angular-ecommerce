import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(newCartItem: CartItem) {

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    existingCartItem = this.cartItems.find(cartItem =>
      cartItem.id === newCartItem.id
    );

    alreadyExistsInCart = (existingCartItem != undefined);

    if (alreadyExistsInCart) {
      // @ts-ignore
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(newCartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.cartItems.forEach(cartItem => {
      // @ts-ignore
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    });

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(cartItem: CartItem) {

    if (--cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(cartItemToRemove: CartItem) {

    const itemIndex = this.cartItems.findIndex(
      cartItem => cartItem.id === cartItemToRemove.id
    );

    if (itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }

}
