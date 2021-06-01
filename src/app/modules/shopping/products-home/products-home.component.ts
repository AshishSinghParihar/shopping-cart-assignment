import { Component, OnInit } from '@angular/core';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.scss'],
})
export class ProductsHomeComponent implements OnInit {
  carouselCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 1000,
    smartSpeed: 1000,
    navText: [' Prev ', ' Next '],
    responsive: {
      0: {
        items: 1,
        loop: true,
        nav: false,
      },
      480: {
        items: 1,
        loop: true,
        nav: false,
      },
      768: {
        items: 1,
        loop: true,
      },
      940: {
        items: 1,
        loop: true,
      },
    },
    nav: true,
  };

  carouselData: any[] = [{}];
  productCategories: any[] = [{}];

  constructor(
    private dataService: DataService,
    carouselConfig: NgbCarouselConfig
  ) {
    carouselConfig.interval = 2000;
    carouselConfig.wrap = true;
    carouselConfig.keyboard = false;
    carouselConfig.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.getProductBanners();
    this.getProductCategories();
  }

  getProductBanners() {
    this.dataService.getProductBanners().subscribe((data: any) => {
      data.map(
        (record: any) =>
          (record.bannerImageUrl = '/assets' + record.bannerImageUrl)
      );
      this.carouselData = data;
    });
  }

  getProductCategories() {
    this.dataService.getProductCategories().subscribe((resp: any) => {
      console.log(resp);
      resp.map(
        (record: any) => (record.imageUrl = '/assets' + record.imageUrl)
      );
      this.filterAndSortCategories(resp);
    });
  }

  filterAndSortCategories(categories: any) {
    this.productCategories = categories
      .filter((record: any) => record.enabled === true)
      .sort(function (first: any, second: any) {
        if (first.order > second.order) {
          return 1;
        }
        if (first.order < second.order) {
          return -1;
        }
        return 0;
      });
    console.log('prodCat', this.productCategories);
  }
}
