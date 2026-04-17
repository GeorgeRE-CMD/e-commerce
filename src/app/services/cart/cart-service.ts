import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICartInterfaceResponse } from '../../interface/cart/cart-interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient);
  cartId = signal('');
  totalCartItems = signal('');
  endPoint = '/api/v1/cart';
  // ** add products to cart;

  addProductsToCart(pId: string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}${this.endPoint}`, {
      productId: pId
    });
  }
  updatecartProductsQuantity(pId: string, count: string | number): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}${this.endPoint}/${pId}`, {
      count: count
    });
  }
  getLoggedUserCart(): Observable<ICartInterfaceResponse> {
    return this.http.get<ICartInterfaceResponse>(`${environment.baseUrl}${this.endPoint}`);
  }
  removeSpecificCartItem(pId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}${this.endPoint}/${pId}`);
  }
  clearUserCart(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}${this.endPoint}`);
  }



  // **payment methods

  checkoutSession(cartId: string, addressForm: { detail: string, phone: string, city: string }, baseUrl = 'http://localhost:4200/') {
    return this.http.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`, {
      shippingAddress: {
        details: addressForm.detail,
        phone: addressForm.phone,
        city: addressForm.city
      }
    })
  }

  cashOrder(cartId: string, addressForm: { detail: string, phone: string, city: string }) {
    return this.http.post(`${environment.baseUrl}/api/v1/orders/${cartId}`, {
      shippingAddress: {
        details: addressForm.detail,
        phone: addressForm.phone,
        city: addressForm.city
      }
    })
  }

}
