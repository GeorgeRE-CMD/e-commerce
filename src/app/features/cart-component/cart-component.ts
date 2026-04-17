import { ICartData, ICartInterfaceResponse } from './../../interface/cart/cart-interface';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartService } from '../../services/cart/cart-service';
import { ICartInterface } from '../../layouts/cart-interface';

@Component({
  selector: 'app-cart-component',
  imports: [RouterLink],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css',
})
export class CartComponent implements OnInit {
  cartS = inject(CartService);
  cartData: WritableSignal<ICartInterfaceResponse | null> = signal(null)
  cartItems: WritableSignal<ICartData | null> = signal(null);
  loadingItemId = signal<string | null>(null);
  isloading = signal<string | null>(null);
  ngOnInit(): void {
    this.getUserCart();
  }

  countUp(item: any) {
    if (!item?.product?._id) return;

    this.loadingItemId.set(item.product._id);

    this.cartS.updatecartProductsQuantity(item.product._id, item.count + 1)
      .subscribe({
        next: (res) => {
          this.cartItems.set(res.data);
          this.loadingItemId.set(null);
        },
        error: () => {
          this.loadingItemId.set(null);
        }
      });
  }
  countDown(item: any) {
    if (!item?.product?._id || item.count <= 1) return;

    this.loadingItemId.set(item.product._id);

    this.cartS.updatecartProductsQuantity(item.product._id, item.count - 1)
      .subscribe({
        next: (res) => {
          this.cartItems.set(res.data);
          this.loadingItemId.set(null);
        },
        error: () => {
          this.loadingItemId.set(null);
        }
      });
  }
  // ** GeT User Cart
  getUserCart() {
    this.cartS.getLoggedUserCart().subscribe({
      next: (res:any) => {
        console.log(res.data.products);
        this.cartItems.set(res.data);
        this.cartS.totalCartItems.set(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCartData() {
    console.log(this.cartData)
  }
  // ** delete specific item

  deleteSpecificItem(pId: string) {
    this.isloading.set(pId);
    this.cartS.removeSpecificCartItem(pId).subscribe({
      next: (res) => {
        this.isloading.set(null);
        this.cartItems.set(res)
        console.log(res)
      },
      error: (err) => {
        this.isloading.set(null);
        console.log(err)
      }
    })
  }

  clearCart() {
    this.cartS.clearUserCart().subscribe({
      next: (res) => {
        this.cartItems.set(null)
      },
      error: () => { }
    })
  }
}
