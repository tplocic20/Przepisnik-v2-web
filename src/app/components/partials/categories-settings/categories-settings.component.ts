import {Component, OnInit} from '@angular/core';
import {FireService} from "../../../services/fire.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-categories-settings',
  templateUrl: './categories-settings.component.html',
  styleUrls: ['./categories-settings.component.scss']
})
export class CategoriesSettingsComponent implements OnInit {

  constructor(private srv: FireService, private fb: FormBuilder) {
  }

  categories: any;
  addingNewCat: boolean = false;
  categoryEditForm: FormGroup;
  categoryNewForm: FormGroup;
  ngOnInit() {
    this.categories = this.srv.categories;
  }

  addCategory() {
    if (!this.addingNewCat) {
      this.categoryNewForm = this.fb.group({
        name: ["", Validators.required]
      });
      this.addingNewCat = true;
    } else {
      this.srv.addCategory(this.newCategoryName).then(() => this.cancelNewCategory());
    }
  }

  cancelNewCategory() {
    this.addingNewCat = false;
    this.newCategoryName = null;
  }

  editCategory(cat) {
    this.cancelNewCategory();
    cat.inEdit = true;
    this.categoryEditForm = this.fb.group(
      {
        name: [cat.Name, Validators.required]
      }
    );
  }

  saveCategory(cat) {
    if (this.categoryEditForm.touched && this.categoryEditForm.invalid) return;
    cat.Name = this.categoryEditForm.get('name').value;
    delete cat.isEdit;
    this.srv.editCategory(cat);
  }

  cancelEditCategory(cat) {
    delete cat.inEdit;
    this.categoryEditForm = null;
  }

  removeCategory() {

  }

}
