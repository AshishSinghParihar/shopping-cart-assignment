import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { HttpService } from './core/services/http/http.service';
import { UtilService } from './core/services/util/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  categoriesSub: Subscription;

  constructor(
    private httpService: HttpService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.httpService
      .getProductBanners()
      .pipe(take(1))
      .subscribe(
        (resp: any) => {},
        (error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.utilService.showErrorPage();
          }
        }
      );
  }
}
