import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FireService} from "../../../services/fire.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessagesService} from "../../../services/messages.service";

@Component({
  selector: 'app-categories-settings',
  templateUrl: './categories-settings.component.html',
  styleUrls: ['./categories-settings.component.scss']
})
export class CategoriesSettingsComponent implements OnInit, AfterViewInit {

  constructor(private srv: FireService, private fb: FormBuilder, private toast: MessagesService) {
  }

  categories: any;
  addingNewCat: boolean = false;
  categoryEditForm: FormGroup;
  categoryNewForm: FormGroup;
  @ViewChildren('focusInput') focusInputs: QueryList<ElementRef>;

  ngOnInit() {
    this.categories = this.srv.categories;
  }

  ngAfterViewInit() {
    this.focusInputs.changes.subscribe((changes) => {
      if (changes.first) {
        const el = changes.first;
        el.nativeElement.focus();
      }
    });
  }

  categoriesTrackFn(index, cat) {
    return cat.$key;
  }

  addCategory() {
    if (!this.addingNewCat) {
      this.categoryNewForm = this.fb.group({
        name: ["", Validators.required]
      });
      this.addingNewCat = true;
    } else {
      if (this.categoryNewForm.touched && this.categoryNewForm.invalid) return;
      const name = this.categoryNewForm.get("name").value;
      this.srv.addCategory(name).then(() => {
        this.toast.success(`Dodano kategorię ${name}`);
      });
      this.cancelNewCategory();
    }
  }

  cancelNewCategory() {
    this.addingNewCat = false;
    if (this.categoryNewForm)
      this.categoryNewForm.reset();
  }

  editCategory(cat, view) {
    if (this.categoryEditForm) return;
    this.cancelNewCategory();
    view.inEdit = true;
    this.categoryEditForm = this.fb.group(
      {
        name: [cat.Name, Validators.required]
      }
    );
  }

  saveCategory(cat, view) {
    if (this.categoryEditForm.touched && this.categoryEditForm.invalid) return;
    cat.Name = this.categoryEditForm.get('name').value;
    delete view.inEdit;
    this.srv.editCategory(cat).then(() => {
      this.categoryEditForm = null;
      this.toast.info("Edytowano kategorię");
    });
  }

  cancelEditCategory(cat, view) {
    delete view.inEdit;
    this.categoryEditForm = null;
  }

  removeCategory(cat, view) {
    if (!view.toRemove) {
      view.toRemove = true;
    } else {
      view.isRemoving = true;
      view.removeTimer = 5;
      view.removeTimeout = setInterval(() => {
        view.removeTimer--;
        if (view.removeTimer === 0) {
          this.srv.removeCategory(cat).then(() => this.toast.warning(`Usunięto kategorię ${cat.Name}`));
          clearInterval(view.removeTimeout);
        }
      }, 1000);
    }
  }

  cancelRemove(cat, view) {
    if (view.toRemove) {
      delete view.toRemove;
    }
    if (view.isRemoving) {
      clearInterval(view.removeTimeout);
      delete view.removeTimeout;
      delete view.isRemoving;
      delete view.removeTimer;
    }
  }

}
