import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ModalModeEnum} from "../../../models/enums/ModalModeEnum";
import {Observable} from "rxjs/Observable";
import {Recipe} from "../../../models/Recipe";
import {FireService} from "../../../services/fire.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CategoriesSelectComponent} from "../../partials/categories-select/categories-select.component";

@Component({
  selector: 'app-add-edit-recipe-modal',
  templateUrl: './add-edit-recipe-modal.component.html',
  styleUrls: ['./add-edit-recipe-modal.component.scss']
})
export class AddEditRecipeModalComponent implements OnInit {

  @ViewChild('categories') categories: CategoriesSelectComponent;
  firstTabValid: boolean = true;
  secondTabValid: boolean = true;
  thirdTabValid: boolean = true;

  public config: any;

  private recipe: Recipe = {Name: ""};

  constructor(private srv: FireService, public dialogRef: MatDialogRef<AddEditRecipeModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.config = data;
  }

  get modalTittle() {
    if (this.config.mode === ModalModeEnum.Add) {
      return "Nowy przepis";
    } else {
      return `Edycja ${this.recipe.Name}`;
    }
  }

  ngOnInit(): void {
    if (this.config.mode === ModalModeEnum.Add) {
      this.recipe.Engredients = [{Name: "Składniki", Positions: []}];
    } else {
      if (this.config.recId) {
        this.srv.getRecipe(this.config.recId).subscribe(rec => this.recipe = rec);
      } else {
        this.close();
      }

    }
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.firstTabValid = this.categories.validCategories != null;
  }
}
