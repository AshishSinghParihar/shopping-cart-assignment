import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  filterAndSortCategories(categories: any) {
    return categories
      .filter((record: any) => record.enabled === true)
      .sort(function (first: any, second: any) {
        if (first.order > second.order) {
          return 1;
        }
        if (first.order < second.order) {
          return -1;
        }
        return 0;
      });
  }
}
