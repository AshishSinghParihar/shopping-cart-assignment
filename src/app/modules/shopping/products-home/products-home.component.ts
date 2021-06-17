import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getProductBanners();
    this.getProductCategories();
  }

  getProductBanners() {
    this.httpService
      .getProductBanners()
      .pipe(take(1))
      .subscribe(
        (data: any) => {
          data.map(
            (record: any) =>
              (record.bannerImageUrl = '/assets' + record.bannerImageUrl)
          );
          this.carouselData = data;
        },
        (error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.utilService.showErrorPage();
          }
        }
      );
  }

  getProductCategories() {
    this.httpService
      .getProductCategories()
      .pipe(take(1))
      .subscribe(
        (resp: any) => {
          resp.map(
            (record: any) => (record.imageUrl = '/assets' + record.imageUrl)
          );
          this.productCategories =
            this.utilService.filterAndSortCategories(resp);
        },
        (error: any) => {
          if (error.status === 0) {
            this.utilService.showErrorPage();
          }
        }
      );
  }

  exploreCategory(categoryId: string) {
    this.utilService.selectedCategoryEmitter.next(categoryId);
    this.router.navigate(['/products', 'plp']);
  }
}
