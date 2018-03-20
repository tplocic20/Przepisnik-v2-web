import {Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AddEditRecipeModalComponent} from "../../modals/add-edit-recipe-modal/add-edit-recipe-modal.component";
import {ModalService} from "../../../services/modal.service";
import {ModalModeEnum} from "../../../models/enums/ModalModeEnum";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-recipescontainer',
  templateUrl: './recipescontainer.component.html',
  styleUrls: ['./recipescontainer.component.scss']
})
export class RecipescontainerComponent implements OnInit {

  selectedCategory: string;
  constructor(private viewContainerRef: ViewContainerRef, private modalSrv: ModalService, private dialogSrv: MatDialog) { }

  ngOnInit() {
  }

  test(ev) {
    this.selectedCategory = ev;
  }

  addRecipe() {
    // this.modalSrv.showModal(this.viewContainerRef, AddEditRecipeModalComponent, {mode: ModalModeEnum.Add});
    this.dialogSrv.open(AddEditRecipeModalComponent, {
      // width: '1000px',
      disableClose: true,

      data: { mode: ModalModeEnum.Add }
    });

  }

}
