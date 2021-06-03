import { Component, OnInit } from '@angular/core';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/core/http/data/data.service';
import { UtilService } from 'src/app/core/services/util/util.service';

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
    private utilService: UtilService,
  ) {
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
      this.productCategories = this.utilService.filterAndSortCategories(resp);
    });
  }
}
