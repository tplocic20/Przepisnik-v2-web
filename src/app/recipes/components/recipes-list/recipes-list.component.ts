import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Recipe} from "../../../models/Recipe";
import {FireService} from "../../../services/fire.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnChanges {

  @Input() category: string;
  recipes: Observable<Recipe[]>;
  selectedRecipe: any;
  loading = true;

  constructor(private srv: FireService, public searchService: SearchService) {

  }

  ngOnInit() {
    this.getRecipes();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']) {
      this.getRecipes();
    }
  }

  private getRecipes() {
    this.recipes = this.srv.getRecipes(this.category);
  }

}
