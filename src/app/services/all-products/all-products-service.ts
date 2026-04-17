import { IProductInterface } from './../../interface/all-products-interface/all-products-interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllProductsService {
  http = inject(HttpClient);
  allProducts():Observable<IProductInterface> {
    return this.http.get<IProductInterface>(`${environment.baseUrl}/api/v1/products`);
  }
}