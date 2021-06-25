import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HttpService } from '../../services/http/http.service';
import { Banner } from '../../model/banner';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnDestroy, DoCheck {
  /**
   * This variable stores the Observable's subscription, so that it could be unsubscribed later
   */
  categoriesSub: Subscription;

  /**
   * Dependencies are injected the constructor
   *
   * @param router {Router} Used to navigate from one path to another
   * @param httpService {HttpService} Used to perform HTTP calls for fetching data from local server
   */
  constructor(private router: Router, private httpService: HttpService) {}

  ngOnInit() {}

  /**
   * This method continuously checks if local server is available by sending a dummy HTTP call to server.
   *
   * If the server is available, user is redirected to the Products home page.
   * Otherwise, User stays on the same page.
   */
  ngDoCheck() {
    this.categoriesSub = this.httpService
      .getProductBanners()
      .subscribe((resp: Banner[]) => {
        this.router.navigate(['/products']);
      });
  }

  /**
   * In this life cycle hook, Observable is being unsubcribed
   */
  ngOnDestroy() {
    this.categoriesSub.unsubscribe();
  }
}
