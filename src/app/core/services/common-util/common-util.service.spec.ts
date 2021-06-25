import { TestBed } from '@angular/core/testing';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonUtilService } from './common-util.service';

describe('CommonUtilService', () => {
  let service: CommonUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule],
    });
    service = TestBed.inject(CommonUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
