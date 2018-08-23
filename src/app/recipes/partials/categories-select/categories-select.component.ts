import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {FireService} from "../../../services/fire.service";

@Component({
  selector: 'app-categories-select',
  templateUrl: './categories-select.component.html',
  styleUrls: ['./categories-select.component.scss']
})
export class CategoriesSelectComponent implements OnChanges {


  categories: Observable<any[]>;
  @Input() initialCategories: any;
  @Input() showErrorMessage: boolean;
  selectedCategories: any[] = [];

  get validCategories() {
    if (this.selectedCategories.length === 0)
      return null;
    return this.selectedCategories.join(";");
  }

  constructor(private srv: FireService) {
    this.categories = this.srv.categories;
  }

  checkCategory(key) {
    console.log(key);
    const idx = this.selectedCategories.indexOf(key);
    if (idx > -1) {
      this.selectedCategories.splice(idx, 1);
    } else {
      this.selectedCategories.push(key);
    }
    console.log(this.selectedCategories);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialCategories'] && changes['initialCategories'].currentValue) {
      this.selectedCategories = changes['initialCategories'].currentValue.split(';');
    }
    if (changes['showErrorMessage']) {
      this.showErrorMessage = changes['showErrorMessage'].currentValue;
    }
  }

}
