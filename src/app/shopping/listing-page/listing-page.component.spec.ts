import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ListingPageComponent } from './listing-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListingPageComponent', () => {
  let component: ListingPageComponent;
  let fixture: ComponentFixture<ListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingPageComponent],
      imports: [HttpClientModule, RouterTestingModule, MatSnackBarModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
