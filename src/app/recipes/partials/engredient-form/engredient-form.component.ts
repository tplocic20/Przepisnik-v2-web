import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FireService} from "../../../services/fire.service";

@Component({
  selector: 'app-engredient-form',
  templateUrl: './engredient-form.component.html',
  styleUrls: ['./engredient-form.component.scss']
})
export class EngredientFormComponent implements OnInit {

  @ViewChild('nameInput', {static: false}) input: ElementRef;
  form: FormGroup;
  @Input() data;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private srv: FireService) {
  }

  get canEditAnother() {
    return !this.form.dirty;
  }

  ngOnInit() {
    this.prepareAutocomplete();
    this.createForm();
    this.focusInput();
  }

  prepareAutocomplete() {
  }

  focusInput() {
    this.input.nativeElement.focus();
  }

  private createForm() {
    this.form = this.fb.group(
      {
        name: [this.data ? this.data.Name : '', Validators.required],
        qty: [this.data ? this.data.Qty : ''],
        unit: [this.data ? this.data.Unit : '']
      }
    );
  }

  successClick() {
    if (this.form.valid) {
      this.data.Name = this.form.get("name").value;
      this.data.Qty = this.form.get("qty").value;
      this.data.Unit = this.form.get("unit").value;
      this.submit.emit({
        Name: this.form.get("name").value,
        Qty: this.form.get("qty").value,
        Unit: this.form.get("unit").value
      });
    }
    this.reset();
  }

  reset() {
    this.form.reset({
      name: '',
      qty: 0,
      uit: ''
    });
    delete this.data.isInEdit;
  }

  close() {
    this.cancel.emit();
    this.reset();
  }

}
