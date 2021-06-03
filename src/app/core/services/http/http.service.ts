import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Product } from 'src/app/modules/shopping/model/product';

const BASE_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getProductBanners() {
    return this.http.get(BASE_URL + '/banners');
  }

  getProductCategories() {
    return this.http.get(BASE_URL + '/categories');
  }

  getAllProducts() {
    return this.http
      .get(BASE_URL + '/products')
      .pipe(
        map((data: any) => data.map((product: any) => new Product(product)))
      );
  }

  addToCart(payload: any) {
    return this.http.post(BASE_URL + '/addToCart', payload);
  }
}
