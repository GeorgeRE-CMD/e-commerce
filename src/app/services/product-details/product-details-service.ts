import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private readonly http = inject(HttpClient);
  productDetails(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }
  getProductsByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/api/v1/products?category=${categoryId}`);
  }
}
