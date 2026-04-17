import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IAllCategoriesInterface } from '../../interface/all-categories/all-categories-interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);

  getAllCategories():Observable<IAllCategoriesInterface> {
    return this.http.get<IAllCategoriesInterface>('https://ecommerce.routemisr.com/api/v1/categories');
  }
}
