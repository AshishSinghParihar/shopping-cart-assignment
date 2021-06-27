import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { HttpService } from 'src/app/core/services/http/http.service';
import { CommonUtilService } from 'src/app/core/services/common-util/common-util.service';
import { Banner } from 'src/app/core/model/banner';
import { Category } from 'src/app/core/model/category';

@Component({
  selector: 'app-products-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carouselData: Banner[] = [];
  productCategories: Category[] = [];
  slideInterval = 3000;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private utilService: CommonUtilService
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
        (data: Banner[]) => {
          data.map(
            (record: Banner) =>
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
        (resp: Category[]) => {
          resp.map(
            (record: Category) =>
              (record.imageUrl = '/assets' + record.imageUrl)
          );
          this.productCategories =
            this.utilService.filterAndSortCategories(resp);
        },
        (error: HttpErrorResponse) => {
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
