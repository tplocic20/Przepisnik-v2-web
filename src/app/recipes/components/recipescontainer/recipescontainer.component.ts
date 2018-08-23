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
  leftPanelOpen: boolean = false;
  constructor(private viewContainerRef: ViewContainerRef, private modalSrv: ModalService, private dialogSrv: MatDialog) { }

  ngOnInit() {
  }

  categorySelected(ev) {
    if (this.selectedCategory !== ev)
      this.selectedCategory = ev;
  }

  addRecipe() {
    this.dialogSrv.open(AddEditRecipeModalComponent, {
      disableClose: true,
      data: { mode: ModalModeEnum.Add }
    });

  }

  toggleLeftPanel() {
    this.leftPanelOpen = !this.leftPanelOpen;
  }

}
