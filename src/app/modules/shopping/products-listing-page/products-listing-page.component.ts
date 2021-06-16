import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { HttpService } from 'src/app/core/services/http/http.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-products-listing-page',
  templateUrl: './products-listing-page.component.html',
  styleUrls: ['./products-listing-page.component.scss'],
})
export class ProductsListingPageComponent implements OnInit, OnDestroy {
  productCategories: any[] = [{}];
  filteredProductList: any[] = [{}];
  selectedCategory = '';
  categoriesSub: Subscription;
  productsSub: Subscription;
  selectedCatSub: Subscription;

  constructor(
    private httpService: HttpService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getProductCategories();
    this.getAllProducts();
  }

  ngOnDestroy() {
    this.categoriesSub.unsubscribe();
    this.productsSub.unsubscribe();
    this.selectedCatSub.unsubscribe();
  }

  getProductCategories() {
    this.categoriesSub = this.httpService
      .getProductCategories()
      .subscribe((resp: any) => {
        resp.map(
          (record: any) => (record.imageUrl = '/assets' + record.imageUrl)
        );
        this.productCategories = this.utilService.filterAndSortCategories(resp);
      });
  }

  getAllProducts() {
    this.productsSub = this.httpService
      .getAllProducts()
      .subscribe((resp: any) => {
        resp.map(
          (record: any) => (record.imageURL = '/assets' + record.imageURL)
        );

        this.utilService.allProducts = resp;
        this.selectedCatSub =
          this.utilService.selectedCategoryEmitter.subscribe(
            (category: string) => {
              this.selectedCategory = category;
              this.filterProducts(this.selectedCategory);
            }
          );
      });
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
        (product: any) => product.category === category
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
        productId: productDetails.id,
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
