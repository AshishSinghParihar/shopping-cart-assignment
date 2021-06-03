import { Component, OnInit } from '@angular/core';

import { HttpService } from 'src/app/core/services/http/http.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-products-listing-page',
  templateUrl: './products-listing-page.component.html',
  styleUrls: ['./products-listing-page.component.scss'],
})
export class ProductsListingPageComponent implements OnInit {
  productCategories: any[] = [{}];
  filteredProductList: any[] = [{}];
  selectedCategory = '';

  constructor(
    private httpService: HttpService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getProductCategories();
    this.getAllProducts();
  }

  getProductCategories() {
    this.httpService.getProductCategories().subscribe((resp: any) => {
      // console.log(resp);
      resp.map(
        (record: any) => (record.imageUrl = '/assets' + record.imageUrl)
      );
      this.productCategories = this.utilService.filterAndSortCategories(resp);
    });
  }

  getAllProducts() {
    this.httpService.getAllProducts().subscribe((resp: any) => {
      // console.log(resp);
      resp.map(
        (record: any) => (record.imageURL = '/assets' + record.imageURL)
      );

      this.utilService.allProducts = resp;
      this.filteredProductList = Object.assign(this.utilService.allProducts);
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
      this.filteredProductList = Object.assign(this.utilService.allProducts);
    } else {
      this.filteredProductList = this.utilService.allProducts.filter(
        (product: any) => product.category === category
      );
      console.log('filtered', this.filteredProductList);
    }
  }

  addToCart(productDetails: Product) {
    if (this.utilService.isInStock(productDetails.id)) {
      let payload = {
        productId: productDetails.id,
      };
      // this.httpService.addToCart(payload).subscribe((resp: any) => {
      //   console.log('addedToCart');
      // });

      const product = new Product(productDetails);
      this.utilService.addItemToCart(product);
      this.utilService.openSnackBar('Product added to cart', 'Okay');
    } else {
      this.utilService.openSnackBar('Product out of stock', 'Okay', {
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      });
    }
  }
}
