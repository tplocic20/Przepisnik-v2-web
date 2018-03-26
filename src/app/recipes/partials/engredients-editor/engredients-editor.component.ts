import {
  AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild,
  ViewChildren
} from '@angular/core';
import {EngredientGroup} from "../../../models/EngredientGroup";

@Component({
  selector: 'app-engredients-editor',
  templateUrl: './engredients-editor.component.html',
  styleUrls: ['./engredients-editor.component.scss']
})
export class EngredientsEditorComponent implements OnChanges {


  @Input() engredients: EngredientGroup[];
  @Input() showErrorMessage: boolean;
  @ViewChild('focusInput') focusInput: ElementRef;
  @ViewChildren('nameInput') nameInput: QueryList<ElementRef>;

  newCatName: string;

  constructor() {
  }

  get validEngredients() {
     if (this.engredients.length > 0 && this.engredients[0].Positions.length > 0)
       return this.engredients;
     return null;

  }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['showErrorMessage']) {
      this.showErrorMessage = changes['showErrorMessage'].currentValue;
    }
  }

  setFocusToInput() {
    this.focusInput.nativeElement.focus();
  }

  addCat() {
    if (this.newCatName) {
      this.engredients.push({Name: this.newCatName, Positions: []});
      this.newCatName = "";
    }
    this.setFocusToInput();
  }

  stopAddingCat() {
    this.newCatName = "";
    this.focusInput.nativeElement.blur();
  }

  addEngredient(cat) {
    this.engredients.forEach(c => {
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
    this.engredients.forEach(c => {
      delete (c as any).newElement;
    });
  }


}
