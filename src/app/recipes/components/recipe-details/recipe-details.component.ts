import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../../../models/Recipe";
import {FireService} from "../../../services/fire.service";
import {Collapse} from "../../../styles/animations";
import {SettingsService} from "../../../services/settings.service";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  animations: [Collapse(700)]
})
export class RecipeDetailsComponent implements OnInit {


  recId: any;
  recipe: Recipe;
  isCollapsed: any;

  @ViewChild('tempTimeDiv', /* TODO: add static flag */ {}) tempTimeDiv: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private srv: FireService, public settings: SettingsService) {
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
