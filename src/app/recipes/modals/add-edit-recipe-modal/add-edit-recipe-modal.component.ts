import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "angular-bootstrap-md/modals/modal.directive";

@Component({
  selector: 'app-add-edit-recipe-modal',
  templateUrl: './add-edit-recipe-modal.component.html',
  styleUrls: ['./add-edit-recipe-modal.component.scss']
})
export class AddEditRecipeModalComponent {

  @ViewChild('testModal') public testModal: ModalDirective;

  constructor() { }

  public show() {
    console.log("dupa_");
     this.testModal.show();
  }

}
