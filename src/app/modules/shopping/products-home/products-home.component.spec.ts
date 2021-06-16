import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { ProductsHomeComponent } from './products-home.component';

describe('ProductsHomeComponent', () => {
  let component: ProductsHomeComponent;
  let fixture: ComponentFixture<ProductsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsHomeComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        CarouselModule,
        MatSnackBarModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
