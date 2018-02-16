import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-recipescontainer',
  templateUrl: './recipescontainer.component.html',
  styleUrls: ['./recipescontainer.component.scss']
})
export class RecipescontainerComponent implements OnInit {

  selectedCategory: string;
  constructor() { }

  ngOnInit() {
  }

  test(ev) {
    this.selectedCategory = ev;
  }

}
