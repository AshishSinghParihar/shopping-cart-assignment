import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { CommonUtilService } from 'src/app/core/services/common-util/common-util.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  /**
   * This variable stores the current width of screen in pixels
   */
  screenWidth: number;

  /**
   * This method is called every time the screen width changes
   * and stores the value of scren size in `screenWidth` variable.
   * @param event
   */
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
  }

  /**
   * Dependencies are injected the constructor.
   *
   * @param router
   * @param dialog
   * @param utilService
   */
  constructor(
    private router: Router,
    private dialog: MatDialog,
    public utilService: CommonUtilService
  ) {}

  /**
   * As the component loads, `getScreenSize()` method is called
   * to identify the initial width of the screen.
   */
  ngOnInit(): void {
    this.getScreenSize();
  }

  /**
   * This method open or navigates to the cart page based on the screen width.
   */
  openCart() {
    if (this.screenWidth > 992) {
      this.openCartDialog();
    } else {
      this.router.navigate(['cart']);
    }
  }

  /**
   * This method opens a `MatDialog` containing the `CartComponent`.
   */
  openCartDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.ariaLabel = 'My cart';
    dialogConfig.ariaDescribedBy =
      this.utilService.productCart.getCartDetails();
    dialogConfig.disableClose = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {
      isBigScreen: true,
    };

    this.dialog.open(CartComponent, dialogConfig);
  }

  /**
   * This method navigates user to the Products home page.
   */
  goToHome() {
    this.router.navigate(['/products']);
  }
}
