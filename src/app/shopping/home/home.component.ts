import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { HttpService } from 'src/app/core/services/http/http.service';
import { CommonUtilService } from 'src/app/core/services/common-util/common-util.service';
import { Banner } from 'src/app/core/model/banner';
import { Category } from 'src/app/core/model/category';

/**
 * This is the default main component which loads as the application is started.
 * It is responsible for displaying a carousel cataining banners and list of categories.
 */
@Component({
  selector: 'app-products-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**
   * This is an array containing the list of {Banner} objects fetched from server.
   * The data is used to display the carousel.
   */
  carouselData: Banner[] = [];

  /**
   * This stores the list of available categories fetched from server.
   */
  productCategories: Category[] = [];

  /**
   * This specifies the time interval between two slides of carousel in milli seconds.
   */
  slideInterval = 3000;

  /**
   * Dependencies are injected the constructor
   *
   * @param router {Router} Used to navigate from one path to another
   * @param httpService {HttpService} Used to perform HTTP calls for fetching data from local server
   * @param utilService {CommonUtilService} Used to envoke common/shared functions
   */
  constructor(
    private router: Router,
    private httpService: HttpService,
    private utilService: CommonUtilService
  ) {}

  /**
   * Inside this lifecycle hook, the list of banners and categories are fetched from the server.
   */
  ngOnInit(): void {
    this.getProductBanners();
    this.getProductCategories();
  }

  /**
   * In this method, list of banners is fetched from the server and the response is assigned
   * to `carouselData` variable.
   */
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

  /**
   * In this method, list of categories is fetched from the server and the response is assigned
   * to `productCategories` variable.
   */
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

  /**
   * When the `Explore` button for any specific catoegory is clicked, this method is called
   * to emit the selected category id and navigate user to Products Home page.
   *
   * @param categoryId {string} ID of the selected category
   */
  exploreCategory(categoryId: string) {
    this.utilService.selectedCategoryEmitter.next(categoryId);
    this.router.navigate(['/products', 'plp']);
  }
}
