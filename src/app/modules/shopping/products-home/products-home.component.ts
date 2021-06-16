import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from 'src/app/core/services/http/http.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss'],
})
export class ProductsHomeComponent implements OnInit {
  carouselData: any[] = [{}];
  productCategories: any[] = [{}];
  slideInterval = 3000;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private utilService: UtilService,
  ) {
  }

  ngOnInit(): void {
    this.getProductBanners();
    this.getProductCategories();
  }

  getProductBanners() {
    this.httpService.getProductBanners().subscribe((data: any) => {
      data.map(
        (record: any) =>
          (record.bannerImageUrl = '/assets' + record.bannerImageUrl)
      );
      this.carouselData = data;
    });
  }

  getProductCategories() {
    this.httpService.getProductCategories().subscribe((resp: any) => {
      resp.map(
        (record: any) => (record.imageUrl = '/assets' + record.imageUrl)
      );
      this.productCategories = this.utilService.filterAndSortCategories(resp);
    });
  }

  goToPLP() {
    this.router.navigate(['/products', 'plp']);
  }
}
