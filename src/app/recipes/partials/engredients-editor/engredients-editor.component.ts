import {
  AfterViewInit, Component, ElementRef, Input, OnChanges, QueryList, SimpleChanges, ViewChild,
  ViewChildren
} from '@angular/core';
import {EngredientGroup} from "../../../models/EngredientGroup";
import {EngredientFormComponent} from "../engredient-form/engredient-form.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CollapseExitOnly} from "../../../styles/animations";

@Component({
  selector: 'app-engredients-editor',
  templateUrl: './engredients-editor.component.html',
  styleUrls: ['./engredients-editor.component.scss'],
  animations: [CollapseExitOnly(400)]
})
export class EngredientsEditorComponent implements OnChanges, AfterViewInit {


  @Input() engredients: EngredientGroup[];
  @Input() showErrorMessage: boolean;

  @ViewChild('focusInput') focusInput: ElementRef;
  @ViewChildren('engredientForm') engredientForm: QueryList<EngredientFormComponent>;
  @ViewChildren('nameInput') nameInput: QueryList<ElementRef>;

  currentEngredientForm: EngredientFormComponent = null;
  newCatName: string;
  engredientGroupForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngAfterViewInit() {
    this.engredientForm.changes.subscribe(changes => {
      if (changes.first) {
        this.currentEngredientForm = changes.first;
      }
    });
  }

  get canEdit() {
    let edit = true;
    if (this.engredientGroupForm) {
      edit = edit && !this.engredientGroupForm.dirty;
    }
    if (this.currentEngredientForm) {
      edit = edit && this.currentEngredientForm.canEditAnother;
    }
    return edit;
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

  addGroup() {
    if (this.newCatName) {
      this.engredients.push({Name: this.newCatName, Positions: []});
      this.newCatName = "";
    }
    this.setFocusToInput();
  }

  stopAddingGroup() {
    this.newCatName = "";
    this.focusInput.nativeElement.blur();
  }

  editGroup(grp) {
    this.engredientGroupForm = this.fb.group(
      {
        name: [grp.Name, Validators.required]
      }
    );
    grp.isInEdit = true;
  }

  editGroupConfirm(grp) {
    if (this.engredientGroupForm.valid) {
      grp.Name = this.engredientGroupForm.get("name").value;
      delete grp.isInEdit;
      this.engredientGroupForm.reset();
    }
  }

  editGroupCancel(grp) {
    delete grp.isInEdit;
    this.engredientGroupForm.reset();
  }

  removeGroup(grp) {
    if (this.canEdit) {
      grp.toRemove = true;
    }
  }

  removeGroupConfirm(grp, el) {
    el.classList.add("display-none");
    const idx = this.engredients.indexOf(grp);
    if (idx > -1) {
      this.engredients.splice(idx, 1);
    }
  }

  removeGroupCancel(grp) {
    delete grp.toRemove;
  }

  addEngredient(cat) {
    if (this.canEdit) {
      if (this.currentEngredientForm) {
        this.currentEngredientForm.close();
      }
      this.cancelEngredient();
      cat.newElement = {
        Name: '',
        Qty: 0,
        Unit: ''
      };
    }
  }


  editEngredient(eng) {
    if (this.canEdit) {
      if (this.currentEngredientForm) {
        this.currentEngredientForm.close();
      }
      eng.isInEdit = true;
    }
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


  removeEngredient(eng) {
    eng.toRemove = true;
  }

  removeEngredientCancel(eng) {
    delete eng.toRemove;
  }

  removeEngredientConfirm(grp, eng) {
    if (eng.toRemove) {
      const idx = grp.Positions.indexOf(eng);
      if (idx > -1) {
        grp.Positions.splice(idx, 1);
      }
    }
  }
}
