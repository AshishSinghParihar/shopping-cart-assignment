import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public utilService: UtilService) { }

  ngOnInit(): void {
  }

  navigate(param: string) {
    this.router.navigate([param]);
  }

}
