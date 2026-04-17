import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { NgClass } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart/cart-service';

@Component({
  selector: 'app-check-out-sessions',
  imports: [RouterLink, NgClass, ReactiveFormsModule],
  templateUrl: './check-out-sessions.html',
  styleUrl: './check-out-sessions.css',
})
export class CheckOutSessions {
  offline = signal(true);
  online = signal(false);
  cartId = signal('');
  router = inject(Router);
  cartService = inject(CartService);
  activateRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  addressForm: FormGroup = this.fb.group({
    details: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: [null, [Validators.required]],
  })
  constructor() {
    this.activateRoute.paramMap.subscribe(params => {
      const id = params.get('cartId');

      console.log('ROUTE CART ID:', id);

      if (!id) {
        console.error('cartId is missing from route ❌');
        return;
      }

      this.cartId.set(id);
    });
  }
  cashPayment() {
    this.offline.set(true);
    this.online.set(false);
  }
  visaCard() {
    this.online.set(true);
    this.offline.set(false);
  }

  handlePayment(method: 'cash' | 'online') {
    console.log('CART ID VALUE:', this.cartId());
    console.log('clicked', method); // 🔥 test

    if (method === 'cash') {
      this.cashPayment();
    } else if (method === 'online') {
      this.visaCard();
    }

    this.paymentMethod(method);
  }

  paymentMethod(method: 'cash' | 'online') {
    if (this.addressForm.invalid) return;
    if (method == 'cash') {
      this.cartService.cashOrder(this.cartId(), this.addressForm.value).subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            this.router.navigate(['/home'])
            this.cartId.set(res.cartId);
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
      return
    }
    if (method == 'online') {
      this.cartService.checkoutSession(this.cartId(), this.addressForm.value).subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
  // Track selected method
  // selectedMethod = signal<'cash' | 'visa' | null>(null);

  // Payment options list
  // paymentOptions = [
  //   {
  //     id: 'cash',
  //     label: 'Cash on Delivery',
  //     description: 'Pay when your order arrives at your doorstep',
  //     icon: 'fa-money-bill',
  //   },
  //   {
  //     id: 'visa',
  //     label: 'Visa Card',
  //     description: 'Pay securely with your Visa card',
  //     icon: 'fa-credit-card',
  //   },
  // Add more methods here easily
  // ];

  // selectMethod(id: string) {
  //   this.selectedMethod.set(id as 'cash' | 'visa');
  // }
}
