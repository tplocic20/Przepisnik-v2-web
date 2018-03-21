import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Recipe} from "../../../models/Recipe";
import {FireService} from "../../../services/fire.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";
import {AddEditRecipeModalComponent} from "../../modals/add-edit-recipe-modal/add-edit-recipe-modal.component";
import {ModalModeEnum} from "../../../models/enums/ModalModeEnum";
import {MatDialog} from "@angular/material";

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

  constructor(private srv: FireService, public searchService: SearchService, private dialogSrv: MatDialog) {

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

  editRecipe(key) {
    console.log(key);
    this.dialogSrv.open(AddEditRecipeModalComponent, {
      disableClose: true,
      data: { mode: ModalModeEnum.Edit, recId: key }
    });
  }

}
