import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getProductBanners() {
    return this.http.get(BASE_URL + '/banners');
  }

  getProductCategories() {
    return this.http.get(BASE_URL + '/categories');
  }
}
