import {
  AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import {EngredientGroup} from "../../../models/EngredientGroup";

@Component({
  selector: 'app-engredients-editor',
  templateUrl: './engredients-editor.component.html',
  styleUrls: ['./engredients-editor.component.scss']
})
export class EngredientsEditorComponent {


  @Input() categories: EngredientGroup[];
  @ViewChild('focusInput') focusInput: ElementRef;
  @ViewChildren('nameInput') nameInput: QueryList<ElementRef>;

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

  addEngredient(cat) {
    this.categories.forEach(c => {
      delete (c as any).newElement;
    });
    cat.newElement = {
      Name: '',
      Qty: 0,
      Unit: ''
    };
     this.nameInput.changes.subscribe(changes => {
       if (changes.first) {
         changes.first.nativeElement.focus();
       }
     });
  }

  confirmEngredient(grp) {
    if (grp.newElement) {
      grp.Positions.push(grp.newElement);
      this.addEngredient(grp);
    } else {
      this.cancelEngredient();
    }
  }

  cancelEngredient() {
    this.categories.forEach(c => {
      delete (c as any).newElement;
    });
  }


}
