import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FireService} from "../../../services/fire.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: Observable<any[]>;
  selectOptions: any;
  selectedCategory: any = '-';
  @Output() categorySelected = new EventEmitter<string>();

  constructor(private srv: FireService) { }

  ngOnInit() {
    this.categories = this.srv.categories;
    this.categories.subscribe(cat => {
      const categories = cat.map(i => {
        return {value: i.$key, label: i.Name};
      });
      this.selectOptions = [{value: "-", label: "Wszystkie"}, ...categories];
    });
  }

  selectionChanged(ev) {
    this.categorySelected.emit(ev !== '-' ? ev : null);
  }



}
