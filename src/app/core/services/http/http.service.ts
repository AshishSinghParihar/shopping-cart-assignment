import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Banner } from '../../model/banner';
import { Category } from '../../model/category';
import { Product } from 'src/app/core/model/product';

const BASE_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getProductBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(BASE_URL + '/banners');
  }

  getProductCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(BASE_URL + '/categories');
  }

  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product>(BASE_URL + '/products')
      .pipe(
        map((data: any) => data.map((product: any) => new Product(product)))
      );
  }

  addToCart(payload: any) {
    return this.http.post(BASE_URL + '/addToCart', payload);
  }
}
