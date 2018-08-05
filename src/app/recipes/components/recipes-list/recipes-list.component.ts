import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Recipe} from "../../../models/Recipe";
import {FireService} from "../../../services/fire.service";
import {SearchService} from "../../../services/search.service";
import {AddEditRecipeModalComponent} from "../../modals/add-edit-recipe-modal/add-edit-recipe-modal.component";
import {ModalModeEnum} from "../../../models/enums/ModalModeEnum";
import {MatDialog, MatDialogConfig} from "@angular/material";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit, OnChanges {

  @Input() category: string;
  recipes: Observable<any>;
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
    const config  = {
      disableClose: true,
      data: {mode: ModalModeEnum.Edit, recId: key}
    };
    this.dialogSrv.open(AddEditRecipeModalComponent, config as any);
  }

  removeRecipe(recipe) {
    recipe.toRemove = true;
  }

  removeConfirm(recipe) {
    recipe.isRemoving = true;
    recipe.removeTimer = 3;
    recipe.removeTimeout = setInterval(() => {
      console.log("timeoutRem: " + recipe.removeTimer);
      recipe.removeTimer--;
      if (recipe.removeTimer === 0) {
        this.srv.removeRecipe(recipe.$key);
        clearInterval(recipe.removeTimeout);
      }
    }, 1000);
  }

  removeCancel(recipe) {
    delete recipe.toRemove;
    delete recipe.isRemoving;
    if (recipe.removeTimeout) {
      clearInterval(recipe.removeTimeout);
      delete recipe.removeTimeout;
    }
  }
}
