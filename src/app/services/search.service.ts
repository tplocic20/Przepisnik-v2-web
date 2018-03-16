import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  searchValue: string;
  constructor() { }

  clearSearch() {
    this.searchValue = "";
  }

}
