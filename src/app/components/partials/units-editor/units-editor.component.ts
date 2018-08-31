import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FireService} from "../../../services/fire.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MessagesService} from "../../../services/messages.service";

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

  constructor(private srv: FireService, private fb: FormBuilder, private toast: MessagesService) {
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
    this.srv.editUnit(unit).then(() => {
      this.cancelEditUnit(vm);
      this.toast.info("Zapisano jednostkę");
    });
  }

  removeUnit(unit) {
    this.srv.removeUnit(unit).then(() => this.toast.warning(`Usunięto jednostkę ${unit.Name}`));
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
        const name = this.newUnitForm.get("name").value;
        this.srv.addUnit({Name: name}).then(() => {
          this.cancelNewUnit();
          this.toast.success(`Dodano jednostkę ${name}`);
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
