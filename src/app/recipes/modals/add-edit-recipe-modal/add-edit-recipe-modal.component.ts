import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ModalModeEnum} from "../../../models/enums/ModalModeEnum";
import {Observable} from "rxjs/Observable";
import {Recipe} from "../../../models/Recipe";
import {FireService} from "../../../services/fire.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CategoriesSelectComponent} from "../../partials/categories-select/categories-select.component";
import {EngredientsEditorComponent} from "../../partials/engredients-editor/engredients-editor.component";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-add-edit-recipe-modal',
  templateUrl: './add-edit-recipe-modal.component.html',
  styleUrls: ['./add-edit-recipe-modal.component.scss']
})
export class AddEditRecipeModalComponent implements OnInit {

  @ViewChild('categories', /* TODO: add static flag */ {}) categories: CategoriesSelectComponent;
  @ViewChild('engredients', /* TODO: add static flag */ {}) engredients: EngredientsEditorComponent;
  firstTabValid: boolean = true;
  secondTabValid: boolean = true;
  thirdTabValid: boolean = true;

  public config: any;

  public recipe: Recipe = {Name: ""};

  constructor(private srv: FireService, public dialogRef: MatDialogRef<AddEditRecipeModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private toast: MessagesService) {
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
    this.secondTabValid = this.engredients.validEngredients != null;
    this.thirdTabValid = this.recipe.Name !== "" && this.recipe.Recipe !== "";

    if (this.firstTabValid && this.secondTabValid && this.thirdTabValid) {
      this.recipe.Categories = this.categories.validCategories;
      this.recipe.Engredients = this.engredients.validEngredients;
      if (this.config.mode === ModalModeEnum.Add)
        this.srv.addRecipe(this.recipe).then(() => this.toast.success(`Dodano przepis "${this.recipe.Name}"`));
      else
        this.srv.updateRecipe(this.config.recId, this.recipe).then(() => this.toast.success(`Edytowano przepis "${this.recipe.Name}"`));
      this.close();
    }
  }
}
