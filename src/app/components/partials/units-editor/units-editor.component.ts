import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FireService} from "../../../services/fire.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-units-editor',
  templateUrl: './units-editor.component.html',
  styleUrls: ['./units-editor.component.scss']
})
export class UnitsEditorComponent implements OnInit, AfterViewInit {

  units: any;
  addingNewUnit = false;
  newUnitForm: any;
  @ViewChildren('focusInput') focusInputs: QueryList<ElementRef>;

  constructor(private srv: FireService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.units = this.srv.units;
  }

  ngAfterViewInit(): void {
    this.focusInputs.changes.subscribe((changes) => {
      if (changes.first) {
        const el = changes.first;
        el.nativeElement.focus();
      }
    });
  }
  editUnit(unit, vm) {
    vm.isEdit = true;
    vm.form = this.fb.group(
      {
        name: [unit.Name, Validators.required]
      }
    );
  }

  saveUnit(unit, vm) {
    if (vm.form.invalid) return;
    unit.Name = vm.form.get('name').value;
    this.srv.editUnit(unit).then(() => this.cancelEditUnit(vm));
  }

  removeUnit(unit) {
    this.srv.removeUnit(unit);
  }

  cancelEditUnit(vm) {
    delete vm.isEdit;
    delete vm.form;
  }

  cancelNewUnit() {
    this.addingNewUnit = false;
    this.newUnitForm.reset();
  }

  addUnit() {
    if (this.addingNewUnit) {
      if (this.newUnitForm.valid) {
        this.addingNewUnit = false;
        this.srv.addUnit({Name: this.newUnitForm.get("name").value}).then(() => {
          this.cancelNewUnit();
        });
      }
    } else {
      this.newUnitForm = this.fb.group({
        name: ['', Validators.required]
      });
      this.addingNewUnit = true;
    }
  }
}
