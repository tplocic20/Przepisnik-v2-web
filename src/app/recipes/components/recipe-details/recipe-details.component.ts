import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../../../models/Recipe";
import {FireService} from "../../../services/fire.service";
import {Collapse} from "../../../styles/animations";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  animations: [Collapse(700)]
})
export class RecipeDetailsComponent implements OnInit {

  recId: any;
  recipe: Recipe;

  constructor(private route: ActivatedRoute, private router: Router, private srv: FireService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recId = params.get('id');
      this.srv.getRecipe(this.recId).subscribe(val => this.recipe = val);
    });
  }

  compressExpand(grp) {
    grp.isCollapsed = !grp.isCollapsed;
  }

}
