import { Component, OnInit } from '@angular/core';
import {FireService} from "../../../services/fire.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-units-editor',
  templateUrl: './units-editor.component.html',
  styleUrls: ['./units-editor.component.scss']
})
export class UnitsEditorComponent implements OnInit {

  units: any;
  constructor(private srv: FireService, private fb: FormBuilder) { }

  ngOnInit() {
    this.units = this.srv.units;
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

}
