import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data/data.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-products-listing-page',
  templateUrl: './products-listing-page.component.html',
  styleUrls: ['./products-listing-page.component.scss'],
})
export class ProductsListingPageComponent implements OnInit {
  productCategories: any[] = [{}];
  allProductsList: any[] = [{}];
  filteredProductList: any[] = [{}];
  selectedCategory = '';

  constructor(
    private dataService: DataService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getProductCategories();
    this.getAllProducts();
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

  getAllProducts() {
    this.dataService.getAllProducts().subscribe((resp: any) => {
      console.log(resp);
      resp.map(
        (record: any) => (record.imageURL = '/assets' + record.imageURL)
      );
      this.allProductsList = resp;
      this.filteredProductList = Object.assign(this.allProductsList);
    });
  }

  selectCategory(category: string) {
    if (this.selectedCategory === category) {
      this.selectedCategory = '';
    } else {
      this.selectedCategory = category;
    }
    this.filterProducts(this.selectedCategory);
  }

  filterProducts(category: string) {
    if (category === '') {
      this.filteredProductList = Object.assign(this.allProductsList);
    } else {
      this.filteredProductList = this.allProductsList.filter(
        (product: any) => product.category === category
      );
      console.log('filtered', this.filteredProductList);
    }
  }

  addToCart(productDetails: any) {
    const product = {
      productId: productDetails.id
    }
    this.dataService.addToCart(product).subscribe((resp: any) => {
      
    });
  }
}
