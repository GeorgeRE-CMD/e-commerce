import { CartService } from './../../services/cart/cart-service';
import { Component, inject, input, Input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { IProductsList } from '../../interface/all-products-interface/all-products-interface';
import { RouterLink } from "@angular/router";
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-shop-component',
  imports: [RouterLink, CurrencyPipe, NgClass],
  templateUrl: './shop-component.html',
  styleUrl: './shop-component.css',
})
export class ShopComponent {
  product: InputSignal<IProductsList> = input.required();
  cartS = inject(CartService);
  isLoading = signal(false);
  success = signal(false);
  addProductsToUserCart() {
    this.isLoading.set(true);
    this.cartS.addProductsToCart(this.product()._id).subscribe({
      next: (res :any) => {
        this.isLoading.set(false);
        this.success.set(true);
        this.cartS.totalCartItems.set(res.numOfCartItems)
        setTimeout(() => {
          this.success.set(false);
        }, 1000);
        console.log(res.message)
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err)
      }
    })
  }
}
