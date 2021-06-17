import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { HttpService } from '../../services/http/http.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnDestroy, DoCheck {
  categoriesSub: Subscription;

  constructor(private router: Router, private httpService: HttpService) {}

  ngOnInit() {}

  ngDoCheck() {
    this.categoriesSub = this.httpService
      .getProductBanners()
      .subscribe((resp: any) => {
        this.router.navigate(['/products']);
      });
  }

  ngOnDestroy() {
    this.categoriesSub.unsubscribe();
  }
}
