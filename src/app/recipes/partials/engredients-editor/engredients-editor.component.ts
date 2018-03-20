import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {EngredientGroup} from "../../../models/EngredientGroup";

@Component({
  selector: 'app-engredients-editor',
  templateUrl: './engredients-editor.component.html',
  styleUrls: ['./engredients-editor.component.scss']
})
export class EngredientsEditorComponent {


  @Input() categories: EngredientGroup[];
  @ViewChild('focusInput') focusInput: ElementRef;

  newCatName: string;

  constructor() {
  }

  setFocusToInput() {
    this.focusInput.nativeElement.focus();
  }

  addCat() {
    if (this.newCatName) {
      this.categories.push({Name: this.newCatName, Positions: []});
      this.newCatName = "";
    }
    this.setFocusToInput();
  }

}
