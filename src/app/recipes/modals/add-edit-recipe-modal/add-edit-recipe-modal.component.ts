import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "angular-bootstrap-md/modals/modal.directive";
import {ModalModeEnum} from "../../../models/enums/ModalModeEnum";
import {Observable} from "rxjs/Observable";
import {Recipe} from "../../../models/Recipe";

@Component({
  selector: 'app-add-edit-recipe-modal',
  templateUrl: './add-edit-recipe-modal.component.html',
  styleUrls: ['./add-edit-recipe-modal.component.scss']
})
export class AddEditRecipeModalComponent implements AfterViewInit {

  public config: any;
  modalTittle: string;
  recipe: Observable<Recipe>;
  @ViewChild('modalRef') public modalRef: ModalDirective;

  constructor() {
  }
  ngAfterViewInit(): void {
    if (this.config.mode === ModalModeEnum.Add)
      this.modalTittle = "Nowy przepis";
    else {

    }
    this.modalRef.show();
  }
}
