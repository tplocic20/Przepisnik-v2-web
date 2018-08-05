import { Component, OnInit } from '@angular/core';
import {FireService} from "../../../services/fire.service";
import {Observable} from "rxjs/Observable";
import {Recipe} from "../../../models/Recipe";

@Component({
  selector: 'app-recipes-dashboard',
  templateUrl: './recipes-dashboard.component.html',
  styleUrls: ['./recipes-dashboard.component.scss']
})
export class RecipesDashboardComponent implements OnInit {

  favourites: Observable<any>;

  constructor(private srv: FireService) { }

  ngOnInit() {
    this.favourites = this.srv.getFavourites();
  }

}
