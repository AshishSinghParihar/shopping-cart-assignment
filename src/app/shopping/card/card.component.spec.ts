import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const prodObj = {
    name: 'Apple - Washington, Regular, 4 pcs',
    imageURL: '/static/images/products/fruit-n-veg/apple.jpg',
    description:
      'The bright red coloured and heart shaped Washington apples are crunchy, juicy and slightly sweet. Washington Apples are a natural source of fibre and are fat free.',
    price: 187,
    stock: 50,
    category: '5b6899953d1a866534f516e2',
    sku: 'fnw-apple-4',
    id: '5b6c6aeb01a7c38429530884',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    component.productDetail = prodObj;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
