import { Injectable } from '@angular/core';
import { Item as CartItem } from './models/Item';

@Injectable({providedIn: 'root'})
export class CartService {

private storageKey = 'shoppingCart';

  constructor() {
    // Initialize sessionStorage with demo data if empty
    //if (!sessionStorage.getItem(this.storageKey)) {
    if (!sessionStorage.getItem(this.storageKey)) {
      sessionStorage.setItem(this.storageKey, JSON.stringify([]));
      this.preloadDemoData();
      console.log(" service preloaded");
    }
     
  }

  //Add Product to Cart
  addToCart(item: CartItem): void {
     const items = this.getCartItems();
    items.push(item);
    this.saveCart(items);
  }

  //Get All Cart Items
  getCartItems(): CartItem[] {
      const data = sessionStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  //Update Quantity
  updateQuantity(productId: number, quantity: number): void {
     const cart = this.getCartItems();
   const index = cart.findIndex(c => c.productId === productId);
   cart[index].quantity = quantity;
   this.saveCart(cart);
  }

  //Remove Product from Cart
  removeFromCart(productId: number): void {
   const cart = this.getCartItems();
   const index = cart.findIndex(c => c.productId === productId);
   cart.splice(index, 1);
   this.saveCart(cart);
  }

  //Clear Entire Cart
  clearCart(): void {
   sessionStorage.removeItem(this.storageKey);
    sessionStorage.setItem(this.storageKey, JSON.stringify([]));
  }

  //Calculate Total Items
  getTotalItems(): number {
     const cart = this.getCartItems();
  return cart.length;
  }

  //Calculate Total Amount
  getTotalPrice(): number {
    const cart = this.getCartItems();
    return cart.reduce((sum: number, item: CartItem) => {
      const qty = typeof item.quantity === 'number' ? item.quantity : Number(item.quantity) || 0;
      const price = typeof item.price === 'number' ? item.price : Number(item.price) || 0;
      return sum + price * qty;
    }, 0);
  }

  // Private helper
  private saveCart(cart: CartItem[]): void {
    //save data to sessionStorage
      sessionStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  private preloadDemoData(): void {
    const item1 = new CartItem(1, 'Rose', 15, 1, '/assets/images/rose.jpg');
    const item2 = new CartItem(2, 'Tulip', 12, 1, '/assets/images/tulip.jpg');
    this.saveCart([item1, item2]);
  }
  }

