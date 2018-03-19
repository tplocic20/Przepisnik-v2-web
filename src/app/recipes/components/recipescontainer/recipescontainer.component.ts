import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AddEditRecipeModalComponent} from "../../modals/add-edit-recipe-modal/add-edit-recipe-modal.component";

@Component({
  selector: 'app-recipescontainer',
  templateUrl: './recipescontainer.component.html',
  styleUrls: ['./recipescontainer.component.scss']
})
export class RecipescontainerComponent implements OnInit {

  selectedCategory: string;
  private addEditRecipeModal: AddEditRecipeModalComponent = new AddEditRecipeModalComponent();
  constructor() { }

  ngOnInit() {
  }

  test(ev) {
    this.selectedCategory = ev;
  }

  addRecipe() {
    console.log("add");
    this.addEditRecipeModal.show();
  }

}
