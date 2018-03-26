import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRecipeModalComponent } from './add-edit-recipe-modal.component';

describe('AddEditRecipeModalComponent', () => {
  let component: AddEditRecipeModalComponent;
  let fixture: ComponentFixture<AddEditRecipeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditRecipeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRecipeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
