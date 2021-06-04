import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import { UtilService } from 'src/app/core/services/util/util.service';
import { ProductsCartComponent } from '../products-cart/products-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  screenWidth: number;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
    console.log('Screen width', this.screenWidth);
  }

  constructor(private router: Router, private dialog: MatDialog, public utilService: UtilService) {}

  ngOnInit(): void {
    this.getScreenSize();
  }

  navigate(param: string) {
    this.router.navigate([param]);
  }

  openCart() {
    if (this.screenWidth > 992) {
      this.openCartDialog();
    } else {
      this.navigate('cart');
    }
  }

  openCartDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.ariaLabel = 'My cart';
    dialogConfig.ariaDescribedBy = this.utilService.productCart.getCartDetails();
    dialogConfig.disableClose = true;
    dialogConfig.width = '40%';
    
    this.dialog.open(ProductsCartComponent, dialogConfig);
  }
}
