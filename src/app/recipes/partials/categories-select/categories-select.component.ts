import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {FireService} from "../../../services/fire.service";

@Component({
  selector: 'app-categories-select',
  templateUrl: './categories-select.component.html',
  styleUrls: ['./categories-select.component.scss']
})
export class CategoriesSelectComponent implements OnInit {

  categories: Observable<any[]>;
  @Input() initialCategories: any;
  selectedCategories: any[] = [];
  get validCategories() {
    if (this.selectedCategories.length === 0)
      return null;
    return this.selectedCategories.join(";");
  }

  constructor(private srv: FireService) {
    this.categories = this.srv.categories;
    if (this.initialCategories) {
      this.selectedCategories = this.initialCategories.split(';');
    }
  }

  checkCategory(key) {
    const idx = this.selectedCategories.indexOf(key);
    if (idx > -1) {
      this.selectedCategories.splice(idx, 1);
    } else {
      this.selectedCategories.push(key);
    }
  }

  ngOnInit() {
  }

}
