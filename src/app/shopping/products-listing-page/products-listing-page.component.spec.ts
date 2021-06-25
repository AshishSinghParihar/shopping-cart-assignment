import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductsListingPageComponent } from './products-listing-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductsListingPageComponent', () => {
  let component: ProductsListingPageComponent;
  let fixture: ComponentFixture<ProductsListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListingPageComponent],
      imports: [HttpClientModule, RouterTestingModule, MatSnackBarModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
