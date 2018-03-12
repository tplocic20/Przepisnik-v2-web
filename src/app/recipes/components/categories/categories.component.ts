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
  selectedCategory: any = '-';
  @Output() categorySelected = new EventEmitter<string>();

  constructor(private srv: FireService) { }

  ngOnInit() {
    this.categories = this.srv.getCategories();
  }

  selectionChanged() {
    this.categorySelected.emit(this.selectedCategory !== '-' ? this.selectedCategory : null);
  }



}
