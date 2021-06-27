import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { HttpService } from 'src/app/core/services/http/http.service';
import { CommonUtilService } from 'src/app/core/services/common-util/common-util.service';
import { Product } from '../../core/model/product';
import { Category } from 'src/app/core/model/category';

@Component({
  selector: 'app-products-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss']
})
export class ListingPageComponent implements OnInit {
  /**
   * Variable to store all the categoris of the products fetched from the server
   */
  productCategories: Category[] = [];

  /**
   * Variable to store the list of filtered products
   */
  filteredProductList: Product[] = [];

  /**
   * This contains the value selected category ID in order to finter products based on selected category.
   * By default, its value is empty string which means no category has been selected for filtering products
   */
  selectedCategory = '';

  /**
   * Dependencies are injected the constructor
   *
   * @param httpService {HttpService} Used to perform HTTP calls for fetching data from local server
   * @param utilService {CommonUtilService} Used to envoke common/shared functions
   */
  constructor(
    private httpService: HttpService,
    private utilService: CommonUtilService
  ) {}

  /**
   * In this method, we subscribe to BehaviourSubject being emitted from HomeComponent to identify the
   * selected category and set the `selectedCategory` variable
   */
  ngOnInit(): void {
    this.utilService.selectedCategoryEmitter
      .pipe(take(1))
      .subscribe((category: string) => {
        this.selectedCategory = category;
      });
    this.getProductCategories();
    if (this.utilService.allProducts.length === 0) {
      this.getAllProducts();
    } else {
      this.filterProducts(this.selectedCategory);
    }
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

  getAllProducts() {
    this.httpService
      .getAllProducts()
      .pipe(take(1))
      .subscribe(
        (resp: Product[]) => {
          resp.map(
            (record: Product) => (record.imageURL = '/assets' + record.imageURL)
          );
          this.utilService.allProducts = resp;
          this.filterProducts(this.selectedCategory);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.utilService.showErrorPage();
          }
        }
      );
  }

  selectCategory(category: string) {
    if (this.selectedCategory === category || category === 'all') {
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
        (product: Product) => product.category === category
      );
    }
  }

  onDropdownChange(eventTarget: any) {
    this.selectedCategory = '';
    this.selectCategory(eventTarget.value);
  }

  addToCart(productDetails: Product) {
    if (this.utilService.isInStock(productDetails.id)) {
      let payload = {
        productId: productDetails.id
      };
      // this.httpService.addToCart(payload).subscribe((resp: any) => {
      //   console.log('addedToCart');
      // });

      const product = new Product(productDetails);
      this.utilService.addItemToCart(product);
      this.utilService.openSnackBar('Product added to cart', 'Okay');
    }
  }
}
