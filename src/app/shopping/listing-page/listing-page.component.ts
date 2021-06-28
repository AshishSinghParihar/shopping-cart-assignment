import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { HttpService } from 'src/app/core/services/http/http.service';
import { CommonUtilService } from 'src/app/core/services/common-util/common-util.service';
import { Product } from '../../core/model/product';
import { Category } from 'src/app/core/model/category';

/**
 * This component is responsible for displaying the list of all the product.
 * It also has list of categories as a menu. A user can filter products by selecting any particular
 * category.
 */
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
   * In this method, list of all the products is fetched from the server and the response
   * is assigned to `_allProducts` variable in CommonUtilService by calling the getter
   * function `allProducts`.
   *
   * Thereafter, the products are filetered based on the selected category if any
   * (`Explore` button clicked on HomeComponent), otherwise,
   * all the products are displayed by default without any filtering.
   */
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

  /**
   * This method is called when category is clicked from the category list menu on Product Listing page.
   * The category id is passed as a parameter to this method which is used for filtering.
   *
   * @param category {string} ID of the selected category based on which products need to be filtered.
   */
  selectCategory(category: string) {
    if (this.selectedCategory === category || category === 'all') {
      this.selectedCategory = '';
    } else {
      this.selectedCategory = category;
    }
    this.filterProducts(this.selectedCategory);
  }

  /**
   * This method contains the logic to assign filtered product to `filteredProductsList` variable
   * based on the value of `categoryId` being passed.
   *
   * If the passed `categoryId` is empty string, products are not filtered and all the list of
   * available products from `CommonUtilService` is assigned to `filteredProductsList`. Otherwise,
   * products with given categoryId are filtered and assigned.
   *
   * @param category {string} ID of the selected category based on which products need to be filtered.
   */
  filterProducts(category: string) {
    if (category === '') {
      this.filteredProductList = Object.assign(this.utilService.allProducts);
    } else {
      this.filteredProductList = this.utilService.allProducts.filter(
        (product: Product) => product.category === category
      );
    }
  }

  /**
   * This method is called when the value in category list dropdown is changed.
   *
   * @param eventTarget Event triggered when dropdown value is changed
   */
  onDropdownChange(eventTarget: any) {
    this.selectedCategory = '';
    this.selectCategory(eventTarget.value);
  }

  /**
   * This method is called when `Buy Now` button for any particular product is clicked.
   *
   * It checks if the product is available in stock. If it is available, `addToCart` API
   * is called and item is added into the cart and success message is shown.
   *
   * @param productDetails {Product} Object of a product containing all the details of the product
   */
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
