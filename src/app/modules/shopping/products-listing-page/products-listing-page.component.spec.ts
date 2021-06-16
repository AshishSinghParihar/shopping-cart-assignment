import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductsListingPageComponent } from './products-listing-page.component';
// import { UtilService } from 'src/app/core/services/util/util.service';
// import { HttpService } from 'src/app/core/services/http/http.service';

describe('ProductsListingPageComponent', () => {
  let component: ProductsListingPageComponent;
  let fixture: ComponentFixture<ProductsListingPageComponent>;
  // let utilService: UtilService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListingPageComponent],
      imports: [HttpClientModule, MatSnackBarModule],
      // providers: [HttpService, UtilService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // utilService = fixture.debugElement.injector.get(UtilService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
